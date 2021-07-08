import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { breastFeedActions } from "../../features/breastFeed/breastFeedSlice";
import { RootState } from "../../app/store";
import { babyBottleActions, DiaperActions } from "../../features";
import { createRef } from "react";

interface Props extends PropsFromRedux {
}

interface State {
    open: boolean;
}

class ImportModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false};
    }

    private textFieldRef = createRef<HTMLTextAreaElement>();

    public render() {
        return <>
        <Button variant="outlined" color="primary" onClick={this.openModal}>
            Importer
        </Button>
        <Dialog open={this.state.open} onClose={this.closeModal}>
            <DialogTitle>
                Importer
            </DialogTitle>
            <DialogContent>
                <TextField inputRef={this.textFieldRef} multiline={true}>
                </TextField>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.updateState} color="secondary">
                Importer
            </Button>
            <Button onClick={this.closeModal} color="secondary">
                Fermer
            </Button>
            </DialogActions>
        </Dialog>
        </>
    }

    private openModal = () => {
        this.setState({open: true});
    }
    
    private closeModal = (event?: any, reason?: string) => {
        this.setState({open: false});
    }

    private updateState = () => {
        const value = this.textFieldRef.current?.value;
        if (value) {
            try {
                const jsonObject: any = JSON.parse(value);
                if (jsonObject.babyBottle) {
                    this.props.importBabyBottleData(jsonObject.babyBottle);
                }
                if (jsonObject.diaper) {
                    this.props.importDiaperData(jsonObject.diaper);
                }
                if (jsonObject.breastFeed) {
                    this.props.importBreastFeedData(jsonObject.breastFeed);
                }
            } catch (e) {
    
            }
        }
        this.setState({open: false});
    }
}

const mapDispatch = {...babyBottleActions, ...breastFeedActions, ...DiaperActions};

const connector = connect(undefined, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const ImportModal = connector(ImportModalBase);