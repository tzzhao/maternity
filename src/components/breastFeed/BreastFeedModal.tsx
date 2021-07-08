import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { breastFeedActions } from "../../features/breastFeed/breastFeedSlice";
import { BreastFeedType, RIGHT } from "../../interfaces/breastFeed.interfaces";

interface Props extends PropsFromRedux {
    type: BreastFeedType
}

interface State {
    startTime: number;
    open: boolean;
    refreshInterval: any;
}

class BreastFeedModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false, startTime: 0, refreshInterval: undefined};
    }

    public render() {
        const type = this.props.type === RIGHT ? 'droit' : 'gauche';
        return <>
        <Button variant="contained" color="primary" onClick={this.openModal}>
            Sein {type}
        </Button>
        <Dialog open={this.state.open} onClose={this.closeModal}>
            <DialogTitle>
                Sein {type}
            </DialogTitle>
            <DialogContent>
                {this.getDuration()}
            </DialogContent>
            <DialogActions>
            <Button autoFocus variant="contained"  onClick={this.saveData} color="primary">
                Fini!
            </Button>
            <Button autoFocus onClick={this.closeModal} color="secondary">
                Annuler
            </Button>
            </DialogActions>
        </Dialog>
        </>
    }

    private getDuration = () => {
        const duration = this.getNowTime() - this.state.startTime;
        const minutes =  Math.floor(duration / 60);
        const hours = Math.floor(minutes / 60);

        const realMinutes = minutes - hours * 60;
        const realSeconds = duration - minutes * 60;
        
        const hoursString = this.getFormattedTime(hours);
        const minutesString = this.getFormattedTime(realMinutes);
        const secondsString = this.getFormattedTime(realSeconds);
        return `${hoursString}:${minutesString}:${secondsString}`;
    }

    private openModal = () => {
        this.clearInterval();
        const timeout = setInterval(() => {
            this.forceUpdate();
        }, 1000);
        this.setState({open: true, startTime: this.getNowTime(), refreshInterval: timeout});
        if (this.props.type === RIGHT) {
            this.props.startRightBreastFeeding();
        } else {
            this.props.startLeftBreastFeeding();
        }
    }

    private clearInterval = () => {
        if (this.state.refreshInterval !== undefined) {
            clearInterval(this.state.refreshInterval);
        }
    }

    private saveData = () => {
        this.clearInterval();
        const now = this.getNowTime();
        this.props.stopBreastFeeding(now - this.state.startTime);
        this.setState({open: false, refreshInterval: undefined});
    }
    
    private closeModal = (event?: any, reason?: string) => {
        if (reason && reason === 'backdropClick') {
            return;
        }
        this.clearInterval();
        this.setState({open: false, refreshInterval: undefined});
        this.props.stopBreastFeeding(undefined);
    }

    private getNowTime = () => {
        return Math.round(Date.now() / 1000);
    }

    private getFormattedTime = (num: number) => {
        return num < 10 ? `0${num}` : num;
    }
}

const mapDispatch = breastFeedActions;

const connector = connect(undefined, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const BreastFeedModal = connector(BreastFeedModalBase);