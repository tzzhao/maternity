import { PureComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";
import {formatDate} from '../../utils/date.utils';

interface BabyBottleActivityProps extends PropsFromRedux {

}

class BabyBottleActivityBase extends PureComponent<BabyBottleActivityProps> {
    public render() {
        return Object.keys(this.props.data).map((key: any) => {
            const singleData = this.props.data[key];
            const date = singleData.start * 1000 + singleData.duration * 1000;
            const dateString = formatDate(date);
            return <div>{dateString}: {singleData.duration}s - {singleData.quantity}mL (Biberon)</div>;
        }).reverse();
    }
}

const mapState = (state: RootState) => ({
    data: state.babyBottle.data,
})

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const BabyBottleActivity = connector(BabyBottleActivityBase);