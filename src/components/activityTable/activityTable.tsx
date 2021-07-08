import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import { BreastFeedData, DiaperData, LEFT, PEE } from "../../interfaces";
import { BabyBottleData } from "../../interfaces/babyBottle.interface";
import {formatDate, formatDuration} from '../../utils/date.utils';
import { ManualModal, ManualModalMode } from "../manual/ManualModal";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { babyBottleActions, breastFeedActions, DiaperActions } from "../../features";

interface ActivityTableProps extends PropsFromRedux {

}

class ActivityTableBase extends PureComponent<ActivityTableProps> {
    public render() {
        return <TableContainer component={Paper}>
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
    }

    renderRows() {
        const data: any = [...Object.values(this.props.babyBottle), ...Object.values(this.props.breastFeed), ...Object.values(this.props.diaper)];
        data.sort((a: any, b: any) => {
            const aScore = a.start || a.time;
            const bScore = b.start || b.time;
            return bScore - aScore;
        });
        return data.map((d: any) => {
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
        return <TableRow>
            <TableCell>{formatDate(data.start * 1000)}</TableCell>
            <TableCell>Sein {data.type === 'l' ? '(G)' : '(D)'}</TableCell>
            <TableCell>{formatDuration(data.duration)}</TableCell>
            <TableCell></TableCell>
            <TableCell>
                <ManualModal modalTitle='Modifier' iconButton={<EditIcon fontSize='small'/>} mode={mode} data={data} />
                <IconButton color="secondary" onClick={onDelete}><DeleteIcon fontSize='small'/></IconButton>    
            </TableCell>
        </TableRow>
    }

    private renderDiaperRow(data: DiaperData ) {
        const onDelete = () => {
            this.props.removeDiaperData(data.time);
        }
        return <TableRow>
            <TableCell>{formatDate(data.time * 1000)}</TableCell>
            <TableCell>Couche ({data.type === 'p' ? 'P' : 'C'})</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
                <IconButton color="secondary" onClick={onDelete}><DeleteIcon fontSize='small'/></IconButton>
            </TableCell>
        </TableRow>
    }

    private renderBabyBottleRow(data: BabyBottleData) {
        const onDelete = () => {
            this.props.removeBabyBottleData(data.start);
        }
        return <TableRow>
        <TableCell>{formatDate(data.start * 1000)}</TableCell>
        <TableCell>Biberon</TableCell>
        <TableCell>{formatDuration(data.duration)}</TableCell>
        <TableCell>{data.quantity}</TableCell>
        <TableCell>
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