import { PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import {formatDate} from '../../utils/date.utils';

interface BreastFeedActivityProps extends PropsFromRedux {

}

class BreastFeedActivityBase extends PureComponent<BreastFeedActivityProps> {
    public render() {
        return Object.keys(this.props.data).map((key: any) => {
            const singleData = this.props.data[key];
            const date = singleData.start * 1000 + singleData.duration * 1000;
            const dateString = formatDate(date);
            const type = singleData.type === 'r' ? 'droit' : 'gauche';
            return <div>{dateString}: {singleData.duration}s (Sein {type})</div>;
        }).reverse();
    }
}

const mapState = (state: RootState) => ({
    data: state.breastFeed.data,
})

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const BreastFeedActivity = connector(BreastFeedActivityBase);