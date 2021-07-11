import { Button, IconButton, LabelDisplayedRowsArgs, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { ChangeEvent, PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import { BreastFeedData, DiaperData, LEFT, PEE } from "../../interfaces";
import { BabyBottleData } from "../../interfaces/babyBottle.interface";
import {formatDate, formatDuration} from '../../utils/date.utils';
import { ManualModal, ManualModalMode } from "../manual/ManualModal";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { babyBottleActions, breastFeedActions, DiaperActions } from "../../features";
import { DataModel } from "../../interfaces/data.interface";

const DEFAULT_PAGE_SIZE: number = 10;

const TablePaginationAny: any = TablePagination;

const STORAGE_KEY: string = 'rowPerPage';

interface ActivityTableProps extends PropsFromRedux {

}

interface ActivityTableState {
    page: number,
    rowsPerPage: number, 
    data: DataModel[][],
    size: number
}

class ActivityTableBase extends PureComponent<ActivityTableProps, ActivityTableState> {

    constructor(props: ActivityTableProps) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: localStorage.getItem(STORAGE_KEY) && Number(localStorage.getItem(STORAGE_KEY)) || DEFAULT_PAGE_SIZE,
            data: [[]],
            size: 0
        }
    }

    public componentDidMount() {
        const {data, size} = this.getData();
        if (data.length > 0) {
            this.setState({
                data,
                page: Math.max(0, Math.min(this.state.page, data.length - 1)),
                size
            })
        }
    }

    public render() {
        return <>
        <TablePagination
                SelectProps={{
                    MenuProps:{
                        anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }
                }}

                rowsPerPageOptions={[5, 10, 20, 50]}
                component="div"
                count={this.state.size}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                labelRowsPerPage='Entrées par page'
                labelDisplayedRows={(paginationInfo: LabelDisplayedRowsArgs) => `${paginationInfo.from}-${paginationInfo.to} sur ${paginationInfo.count}`}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Qté</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderRows()}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    }

    private handleChangePage = (event: any, page: number) => {
        this.setState({page});
    }

    private handleChangeRowsPerPage = (event : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = Number(event.target?.value);
        this.setState({
            rowsPerPage: value
        });
        localStorage.setItem(STORAGE_KEY, value.toString());
    }

    public componentDidUpdate(prevProps: ActivityTableProps, prevState: ActivityTableState) {
        if (prevProps.babyBottle !== this.props.babyBottle || prevProps.breastFeed !== this.props.breastFeed || prevProps.diaper !== this.props.diaper || prevState.rowsPerPage !== this.state.rowsPerPage) {
            const {data, size} = this.getData();
            this.setState({
                data,
                page: Math.max(0, Math.min(this.state.page, data.length - 1)),
                size
            })
        }
    }

    private getData() {
        const allData: any = [...Object.values(this.props.babyBottle), ...Object.values(this.props.breastFeed), ...Object.values(this.props.diaper)];
        allData.sort((a: any, b: any) => {
            const aScore = a.start || a.time;
            const bScore = b.start || b.time;
            return bScore - aScore;
        });
        const data: DataModel[][] = [];
        for (let i = 0; i * this.state.rowsPerPage < allData.length; i++) {
            data.push(allData.slice(i * this.state.rowsPerPage, Math.min((i + 1) * this.state.rowsPerPage, allData.length)));
        }
        if (data.length === 0) {
            data.push([]);
        }
        return {data, size: allData.length};
    }

    renderRows() {
        return this.state.data[this.state.page].map((d: any) => {
            if (d.time) {
                return this.renderDiaperRow(d);
            } else if (d.quantity) {
                return this.renderBabyBottleRow(d);
            } else {
                return this.renderBreastFeedRow(d);
            }
        })
    }

    private renderBreastFeedRow(data: BreastFeedData) {
        const mode = data.type === LEFT ? ManualModalMode.BREAST_L : ManualModalMode.BREAST_R;
        const onDelete = () => {
            this.props.removeBreastFeedData(data.start);
        }
        return <TableRow key={'breastFeed' + data.start}>
            <TableCell key='start'>{formatDate(data.start * 1000)}</TableCell>
            <TableCell key='label'>Sein {data.type === 'l' ? '(G)' : '(D)'}</TableCell>
            <TableCell key='duration'>{formatDuration(data.duration)}</TableCell>
            <TableCell key='quantity'></TableCell>
            <TableCell key='actions'>
                <ManualModal modalTitle='Modifier' iconButton={<EditIcon fontSize='small'/>} mode={mode} data={data} />
                <IconButton color="secondary" onClick={onDelete}><DeleteIcon fontSize='small'/></IconButton>    
            </TableCell>
        </TableRow>
    }

    private renderDiaperRow(data: DiaperData ) {
        const onDelete = () => {
            this.props.removeDiaperData(data.time);
        }
        return <TableRow key={'diaper' + data.time}>
            <TableCell key='start'>{formatDate(data.time * 1000)}</TableCell>
            <TableCell key='label'>Couche ({data.type === 'p' ? 'P' : 'C'})</TableCell>
            <TableCell key='duration'></TableCell>
            <TableCell key='quantity'></TableCell>
            <TableCell key='actions'>
                <IconButton color="secondary" onClick={onDelete}><DeleteIcon fontSize='small'/></IconButton>
            </TableCell>
        </TableRow>
    }

    private renderBabyBottleRow(data: BabyBottleData) {
        const onDelete = () => {
            this.props.removeBabyBottleData(data.start);
        }
        return <TableRow key={'babyBottle' + data.start}>
        <TableCell key='start'>{formatDate(data.start * 1000)}</TableCell>
        <TableCell key='label'>Biberon</TableCell>
        <TableCell key='duration'>{formatDuration(data.duration)}</TableCell>
        <TableCell  key='quantity'>{data.quantity}</TableCell>
        <TableCell  key='actions'>
            <ManualModal modalTitle='Modifier' iconButton={<EditIcon fontSize='small'/>} mode={ManualModalMode.BABY_BOTTLE} data={data}/>
            <IconButton color="secondary" onClick={onDelete}><DeleteIcon fontSize='small' /></IconButton>
        </TableCell>
    </TableRow>
    }
}

const mapDispatch = {...babyBottleActions, ...breastFeedActions, ...DiaperActions};

const mapState = (state: RootState) => ({
    babyBottle: state.babyBottle.data,
    breastFeed: state.breastFeed.data,
    diaper: state.diaper.data
})

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const ActivityTable = connector(ActivityTableBase);