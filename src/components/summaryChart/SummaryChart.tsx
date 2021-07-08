import { Chart } from "chart.js";
import { createRef, PureComponent, RefObject } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from '../../app/store';
import { WEEKDAYS } from "../../utils/date.utils";

enum Mode {
    YEAR, MONTH, WEEK
}

interface Props extends PropsFromRedux {

}

interface State {
    diaperData: any[];
    breastFeedData: any[];
    mode: Mode;
    startDate: Date
}



class SummaryChartBase extends PureComponent<Props, State> {

    private containerRef: RefObject<HTMLCanvasElement> = createRef();

    private chart!: Chart;

    constructor(props: Props) {
        super(props);
        this.state = {
            diaperData: [],
            breastFeedData: [],
            mode: Mode.WEEK,
            startDate: new Date()
        }
    }

    public componentDidMount() {
        this.chart = new Chart(this.containerRef.current!, {
            type: 'line',
            data: {
                labels: WEEKDAYS,
                datasets: [{
                    label: '',
                    data: []
                }]
            },
            options: {}
        });
    }

    public render() {
        return <div><canvas ref={this.containerRef} /></div>;
    }
}

const mapState = (state: RootState) => ({
    data: state.breastFeed.data,
})

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const SummaryChart = connector(SummaryChartBase);