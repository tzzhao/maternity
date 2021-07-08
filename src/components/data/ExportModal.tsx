import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { breastFeedActions } from "../../features/breastFeed/breastFeedSlice";
import { RootState } from "../../app/store";

interface Props extends PropsFromRedux {
}

interface State {
    open: boolean;
}

class ExportModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false};
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
                <TextField multiline={true} id='content-to-export' inputProps={{
                    readOnly: true,
                    }}
                value={JSON.stringify(this.props.state)}>
                </TextField>
            </DialogContent>
            <DialogActions>
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