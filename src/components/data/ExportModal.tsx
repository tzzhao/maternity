import React, { ChangeEvent, Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { breastFeedActions } from "../../features/breastFeed/breastFeedSlice";
import { RootState } from "../../app/store";
import { download } from "../../utils/download.utils";
import { DataModel } from "../../interfaces/data.interface";
import { CommonData } from "../../interfaces/common.interface";

interface Props extends PropsFromRedux {
}

interface State {
    open: boolean;
    duration: ExportDuration
}

const DAY = 24 * 60 * 60;

enum ExportDuration {
    ALL, DAY, WEEK, MONTH, YEAR 
}

class ExportModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false, duration: ExportDuration.WEEK};
    }

    public render() {
        return <>
        <Button variant="outlined" color="primary" onClick={this.openModal}>
            Exporter
        </Button>
        <Dialog open={this.state.open} onClose={this.closeModal}>
            <DialogTitle>
                Exporter
            </DialogTitle>
            <DialogContent>
                <Select value={this.state.duration} onChange={this.onDurationChange}>
                    <MenuItem value={ExportDuration.ALL}>Tout</MenuItem>
                    <MenuItem value={ExportDuration.YEAR}>Dernière année</MenuItem>
                    <MenuItem value={ExportDuration.MONTH}>Dernier mois</MenuItem>
                    <MenuItem value={ExportDuration.WEEK}>Dernière semaine</MenuItem>
                    <MenuItem value={ExportDuration.DAY}>Dernier jour</MenuItem>
                </Select>
                <TextField multiline={true} rowsMax={10} id='content-to-export' inputProps={{
                    readOnly: true,
                    }}
                value={this.getExportContent()}>
                </TextField>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.download} color="secondary">
                Télécharger
            </Button>
            <Button onClick={this.copyToClipboard} color="secondary">
                Copier
            </Button>
            <Button autoFocus onClick={this.closeModal} color="secondary">
                Fermer
            </Button>
            </DialogActions>
        </Dialog>
        </>
    }
    private download = () => {
        download(this.props.state, `maternity-data-${Date.now()}`);
    }

    private onDurationChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({duration: event.target.value as ExportDuration});
    };

    private getExportContent = () => {
        const now = Date.now() / 1000;
        let startTime: number = 0;
        switch(this.state.duration) {
            case ExportDuration.YEAR: {
                startTime = now - 365 * DAY;
                break;
            }
            case ExportDuration.MONTH: {
                startTime = now - 31 * DAY;
                break;
            }
            case ExportDuration.WEEK: {
                startTime = now - 7 * DAY;
                break;
            }
            case ExportDuration.DAY: {
                startTime = now - DAY;
                break;
            }
            default: {
                return JSON.stringify(this.props.state);
            }
        }
        return JSON.stringify({
            babyBottle: this.filter(this.props.state.babyBottle, startTime, now),
            diaper: this.filter(this.props.state.diaper, startTime, now),
            breastFeed: this.filter(this.props.state.breastFeed, startTime, now),
        })
    }

    private filter(data: {[key:number]: CommonData}, start: number, end: number) {
        return Object.values(data).filter((d: CommonData) => {
            return d.start > start && d.start < end;
        });
    }

    private copyToClipboard = () => {
        /* Get the text field */
        var copyText: any = document.getElementById("content-to-export");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      }

    private openModal = () => {
        this.setState({open: true});
    }
    
    private closeModal = (event?: any, reason?: string) => {
        this.setState({open: false});
    }
}

const mapState = (state: RootState) => {
    return {
        state: {
            babyBottle: state.babyBottle.data,
            diaper: state.diaper.data,
            breastFeed: state.breastFeed.data
        }
    }
}

const mapDispatch = breastFeedActions;

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const ExportModal = connector(ExportModalBase);