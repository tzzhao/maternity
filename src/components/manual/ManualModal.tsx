import React, { ChangeEvent, ChangeEventHandler, Component, createRef, RefObject } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { babyBottleActions } from "../../features/babyBottle/babyBottleSlice";
import { breastFeedActions, DiaperActions } from "../../features";
import { createFalse } from "typescript";
import { BreastFeedData, DiaperData, LEFT, PEE, RIGHT, STOOL } from "../../interfaces";
import { BabyBottleData } from "../../interfaces/babyBottle.interface";

interface Props extends PropsFromRedux {
    modalTitle: string,
    mode?: string,
    data?: BabyBottleData | BreastFeedData | DiaperData,
    iconButton?: JSX.Element,
}

const LOCAL_STORAGE_KEY = 'bottleQuantity';

function getQuantity(): number {
    return Number((localStorage.getItem(LOCAL_STORAGE_KEY) || '60'));
}

export const ManualModalMode = {
    BREAST_L: 'bl',
    BREAST_R: 'br',
    BABY_BOTTLE: 'bottle', 
    DIAPER_PEE: 'pee',
    DIAPER_STOOL: 'stool'
}

interface State {
    mode: string,
    open: boolean
}

class ManualModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {mode: this.props.mode || ManualModalMode.BABY_BOTTLE, open: false};
    }

    private quantityRef: RefObject<HTMLInputElement> = createRef();
    private startTimeRef: RefObject<HTMLInputElement> = createRef();
    private endTimeRef: RefObject<HTMLInputElement> = createRef();

    public render() {
        const isBreast = this.state.mode === ManualModalMode.BREAST_R || this.state.mode === ManualModalMode.BREAST_L;
        const isBabyBottle = this.state.mode === ManualModalMode.BABY_BOTTLE;
        const isDiaper = this.state.mode === ManualModalMode.DIAPER_PEE || this.state.mode === ManualModalMode.DIAPER_STOOL;


        const { startDefault, endDefault, quantityDefault } = this.getDefaultValues();

        return <>
        {this.props.iconButton ? 
        <IconButton onClick={this.openModal}>{this.props.iconButton}</IconButton>
        :
        <Button variant='contained' color="primary" onClick={this.openModal}>
        {this.props.modalTitle}
    </Button>
        }

        <Dialog open={this.state.open} onClose={this.closeModal}>
            <DialogTitle>
                {this.props.modalTitle}
            </DialogTitle>
            <DialogContent>
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                value={this.props.mode || this.state.mode}
                onChange={this.handleChange}
                disabled={!!this.props.mode}
                >
                <MenuItem value={ManualModalMode.BREAST_R}>Sein droit</MenuItem>
                <MenuItem value={ManualModalMode.BREAST_L}>Sein gauche</MenuItem>
                <MenuItem value={ManualModalMode.BABY_BOTTLE}>Biberon</MenuItem>
                <MenuItem value={ManualModalMode.DIAPER_PEE}>Couche (Pipi)</MenuItem>
                <MenuItem value={ManualModalMode.DIAPER_STOOL}>Couche (Caca)</MenuItem>
                </Select>
            </FormControl>
                {isDiaper && <FormControl>
                    <InputLabel>Moment</InputLabel>
                    <Input
                        inputRef={this.startTimeRef}
                        type='datetime-local'
                        defaultValue={startDefault}
                        disabled={!!this.props.mode}
                        inputProps={{
                            step: 1,
                          }}
                    />
                </FormControl>}
                {(isBreast || isBabyBottle) && <><FormControl>
                    <InputLabel>Début</InputLabel>
                    <Input
                        inputRef={this.startTimeRef}
                        type='datetime-local'
                        defaultValue={startDefault}
                        disabled={!!this.props.mode}
                        inputProps={{
                            step: 1,
                          }}
                    />
                </FormControl>
                <FormControl>
                <InputLabel>Fin</InputLabel>
                    <Input
                        inputRef={this.endTimeRef}
                        type='datetime-local'
                        defaultValue={endDefault}
                        inputProps={{
                            step: 1,
                          }}
                    />
                </FormControl></>}
                {isBabyBottle && <FormControl>
                    <InputLabel>Quantité</InputLabel>
                    <Input
                        inputRef={this.quantityRef}
                        defaultValue={quantityDefault}
                        endAdornment={<InputAdornment position="end">mL</InputAdornment>}
                        type='number'
                    />
                </FormControl>
                }
            </DialogContent>
            <DialogActions>
            <Button autoFocus variant="contained"  onClick={this.saveData} color="primary">
                {this.props.modalTitle}
            </Button>
            <Button autoFocus onClick={this.closeModal} color="secondary">
                Annuler
            </Button>
            </DialogActions>
        </Dialog>
        </>
    }

    private getDefaultValues = () => {
        let defaultDate = this.getFormattedTime(Math.floor(Date.now() / 1000));
        let startDefault = defaultDate, endDefault = defaultDate, quantityDefault = getQuantity();
        if (this.props.mode) {
            if (this.props.mode === ManualModalMode.BREAST_L || this.props.mode === ManualModalMode.BREAST_R) {
                const data = this.props.data as BreastFeedData;
                startDefault = this.getFormattedTime(data.start);
                endDefault = this.getFormattedTime(data.start + data.duration);
            } else if (this.props.mode === ManualModalMode.BABY_BOTTLE) {
                const data = this.props.data as BabyBottleData;
                startDefault = this.getFormattedTime(data.start);
                endDefault = this.getFormattedTime(data.start + data.duration);
                quantityDefault = data.quantity;
            } else {
                const data = this.props.data as DiaperData;
                startDefault = this.getFormattedTime(data.time);
            }
        }

        return {
            startDefault,
            endDefault,
            quantityDefault
        }
    }

    private getFormattedTime(timeInSeconds: number) {
        const date = new Date(timeInSeconds * 1000);
        let month = (date.getMonth() + 1).toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        let day = date.getDate().toString();
        if (day.length < 2) {
            day = '0' + day;
        }
        let hours = date.getHours().toString();
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        let minutes = date.getMinutes().toString();
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        let seconds = date.getSeconds().toString();
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        const defaultTime = `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        return defaultTime;
    }

    private handleChange = (evt: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        let mode = evt.target.value as string;
        this.setState({mode});
    }

    private openModal = () => {
        this.setState({open: true});
    }

    private saveData = () => {
        let startTime: number, endTime: number = 0, quantity: number = 0;
        startTime = new Date(this.startTimeRef.current!.value).getTime() / 1000;
        if (this.endTimeRef.current) {
            endTime = new Date(this.endTimeRef.current.value).getTime() / 1000;
        }
        if (this.quantityRef.current) {
            quantity = Number(this.quantityRef.current.value);
        }

        switch(this.state.mode) {
            case ManualModalMode.BABY_BOTTLE: {
                this.props.addBabyBottleData({
                    start: startTime,
                    duration: (endTime - startTime),
                    quantity: quantity
                });
                break;
            }
            case ManualModalMode.BREAST_L: {
                this.props.addBreastFeedData({
                    start: startTime,
                    duration: (endTime - startTime),
                    type: LEFT
                });
                break;

            }
            case ManualModalMode.BREAST_R: {
                this.props.addBreastFeedData({
                    start: startTime,
                    duration: (endTime - startTime),
                    type: RIGHT
                });
                break;

            }
            case ManualModalMode.DIAPER_PEE: {
                this.props.addDiaperData({
                    time: startTime,
                    type: PEE
                });
                break;

            }
            case ManualModalMode.DIAPER_STOOL: {
                this.props.addDiaperData({
                    time: startTime,
                    type: STOOL
                });
                break;
            }
        }
        this.setState({open: false});
    }
    
    private closeModal = () => {
        this.setState({open: false});
    }
}

const mapDispatch = {...babyBottleActions, ...breastFeedActions, ...DiaperActions};

const connector = connect(undefined, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const ManualModal = connector(ManualModalBase);