import React, { ChangeEvent, ChangeEventHandler, Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Input, InputAdornment } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { babyBottleActions } from "../../features/babyBottle/babyBottleSlice";

interface Props extends PropsFromRedux {
}

const LOCAL_STORAGE_KEY = 'bottleQuantity';

function saveQuantity(quantity: number): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, quantity.toString());
}

function getQuantity(): number {
    return Number((localStorage.getItem(LOCAL_STORAGE_KEY) || '60'));
}

interface State {
    startTime: number;
    open: boolean;
    refreshInterval: any;
    quantity: number;
}

class BabyBottleModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false, startTime: 0, refreshInterval: undefined, quantity: getQuantity()};
    }

    public render() {
        return <>
        <Button variant="contained" color="primary" onClick={this.openModal}>
            Biberon
        </Button>
        <Dialog open={this.state.open} onClose={this.closeModal}>
            <DialogTitle>
                Biberon
            </DialogTitle>
            <DialogContent>
                <div>{this.getDuration()}</div>
                <FormControl>
                    <Input
                        value={this.state.quantity}
                        onChange={this.handleChange}
                        endAdornment={<InputAdornment position="end">mL</InputAdornment>}
                        type='number'
                    />
                    <FormHelperText>Quantité</FormHelperText>
                </FormControl>
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

    private handleChange = (evt: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        let quantity = Number(evt.target.value);
        if (quantity === NaN) {
            quantity = this.state.quantity;
        }
        this.setState({quantity});
        saveQuantity(quantity);
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
        this.props.startBabyBottle();
    }

    private clearInterval = () => {
        if (this.state.refreshInterval !== undefined) {
            clearInterval(this.state.refreshInterval);
        }
    }

    private saveData = () => {
        this.clearInterval();
        const now = this.getNowTime();
        this.props.stopBabyBottle({duration: now - this.state.startTime, quantity: this.state.quantity});
        this.setState({open: false, refreshInterval: undefined});
    }
    
    private closeModal = (event?: any, reason?: string) => {
        if (reason && reason === 'backdropClick') {
            return;
        }
        this.clearInterval();
        this.setState({open: false, refreshInterval: undefined});
        this.props.stopBabyBottle(undefined);
    }

    private getNowTime = () => {
        return Math.round(Date.now() / 1000);
    }

    private getFormattedTime = (num: number) => {
        return num < 10 ? `0${num}` : num;
    }
}

const mapDispatch = babyBottleActions;

const connector = connect(undefined, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const BabyBottleModal = connector(BabyBottleModalBase);