import { PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import {formatDate} from '../../utils/date.utils';

interface DiaperActivityProps extends PropsFromRedux {

}

class DiaperActivityBase extends PureComponent<DiaperActivityProps> {
    public render() {
        return Object.keys(this.props.data).map((key: any) => {
            const singleData = this.props.data[key];
            const date = singleData.time * 1000;
            const dateString = formatDate(date);
            const type = singleData.type === 'p' ? 'Pipi' : 'Caca';
            return <div>{dateString}: Couche ({type})</div>;
        }).reverse();
    }
}

const mapState = (state: RootState) => ({
    data: state.diaper.data,
})

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const DiaperActivity = connector(DiaperActivityBase);