import React, { ChangeEvent, Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, MenuItem, Select, TextField } from '@material-ui/core';
import { connect, ConnectedProps } from "react-redux";
import { breastFeedActions } from "../../features/breastFeed/breastFeedSlice";
import { RootState } from "../../app/store";
import { babyBottleActions, DiaperActions } from "../../features";
import { createRef } from "react";

interface Props extends PropsFromRedux {
}

interface State {
    open: boolean;
    isImporting: boolean;
    input: 'file' | 'input'
}

class ImportModalBase extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {open: false, isImporting: false, input: 'file'};
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
                <Select value={this.state.input} onChange={this.onTypeChange}>
                    <MenuItem value='file'>Importer depuis un fichier json</MenuItem>
                    <MenuItem value='input'>Importer depuis du texte</MenuItem>
                </Select>
                {this.state.input === 'file' ?
                <FormControl>
                <Input disableUnderline id='file-import' type='file'></Input>
            </FormControl> :
            <TextField inputRef={this.textFieldRef} placeholder='Entrer les données au format json. Exemple: {"babyBottle":{"1626014654":{"start":1626014654,"duration":1,"quantity":60}},"diaper":{"1626014657":{"time":1626014657,"type":"p"},"1626014658":{"time":1626014658,"type":"s"}},"breastFeed":{"1626014649":{"start":1626014649,"duration":2,"type":"l"},"1626014651":{"start":1626014651,"duration":2,"type":"r"}}}' multiline={true}>
            </TextField>
            }

            </DialogContent>
            <DialogActions>
            <Button onClick={this.updateState} disabled={this.state.isImporting} color="secondary">
                Importer
            </Button>
            <Button onClick={this.closeModal} color="secondary">
                Fermer
            </Button>
            </DialogActions>
        </Dialog>
        </>
    }

    private onTypeChange = (event: ChangeEvent<{name?: string, value: unknown}>) => {
        this.setState({
            input: event.target.value as 'file' | 'input'
        })
    }

    private openModal = () => {
        this.setState({open: true});
    }
    
    private closeModal = (event?: any, reason?: string) => {
        this.setState({open: false});
    }

    private updateState = () => {
        const file = (document.getElementById("file-import") as HTMLInputElement)?.files?.[0];
        if (file && this.state.input === 'file') {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            this.setState({isImporting: true});
            reader.onload = (evt: any) => {
                const data = evt.target.result;
                this.updateData(data);
                this.setState({open: false, isImporting: false});
            }
            reader.onerror = (evt: any) => {
                this.setState({
                    isImporting: false
                })
            }
        } else if (this.state.input === 'input') {
            const value = this.textFieldRef.current?.value;
            this.updateData(value);
            this.setState({open: false});
        }
    }

    private updateData = (value: string | undefined) => {
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
    }
}

const mapDispatch = {...babyBottleActions, ...breastFeedActions, ...DiaperActions};

const connector = connect(undefined, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const ImportModal = connector(ImportModalBase);