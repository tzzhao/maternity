import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { DiaperActions } from "../../features/diaper/diaperSlice";

interface Props extends PropsFromRedux {
}

interface State {
    open: boolean;
}

class DiaperModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false};
    }

    public render() {
        return <>
        <Button variant="contained" color="primary" onClick={this.openModal}>
            Couche
        </Button>
        <Dialog open={this.state.open} onClose={this.closeModal}>
            <DialogTitle>
                Couche
            </DialogTitle>
            <DialogActions>
            <Button autoFocus onClick={this.logPee} variant="contained" color="primary">
                Pipi
            </Button>
            <Button autoFocus onClick={this.logStool} variant="contained" color="primary">
                Caca
            </Button>
            <Button autoFocus onClick={this.closeModal} variant="contained" color="secondary">
                Annuler
            </Button>
            </DialogActions>
        </Dialog>
        </>
    }

    private openModal = () => {
        this.setState({open: true});
    }

    private logPee = () => {
        this.props.logPeeDiaper();
        this.closeModal();
    }

    private logStool = () => {
        this.props.logStollDiaper();
        this.closeModal();
    }
    
    private closeModal = () => {
        this.setState({open: false});
    }
}

const mapDispatch = DiaperActions;

const connector = connect(undefined, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const DiaperModal = connector(DiaperModalBase);