import { Button, MenuItem } from "@material-ui/core";
import { FormControl, Input, InputLabel, Select } from "@material-ui/core";
import { Chart, registerables } from "chart.js";
import { ChangeEvent, createRef, PureComponent, RefObject } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from '../../app/store';
import { LEFT, PEE, RIGHT, STOOL } from "../../interfaces";
import { BABY_BOTTLE_TYPE } from "../../interfaces/babyBottle.interface";
import { DataModel } from "../../interfaces/data.interface";
import { formatDate2, getInputFormattedTime, MONTHS } from "../../utils/date.utils";

Chart.register(...registerables);

enum Mode {
    MONTHS, WEEKS, WEEK
}

interface Props extends PropsFromRedux {

}

interface State {
    mode: Mode;
    startDate: number,
    currentData: DataModel[]
}




class SummaryChartBase extends PureComponent<Props, State> {

    private feedContainerRef: RefObject<HTMLCanvasElement> = createRef();
    private diaperContainerRef: RefObject<HTMLCanvasElement> = createRef();
    private activeContainerRef: RefObject<HTMLCanvasElement> = createRef();

    private feedChart!: Chart;

    private diaperChart!: Chart;

    private activeChart!: Chart;

    constructor(props: Props) {
        super(props);
        this.state = {
            mode: Mode.WEEK,
            startDate: Math.floor((Date.now() - 6 * 24 * 60 * 60 * 1000) / 1000),
            currentData: []
        }
    }
    

    public componentDidMount() {
        const {labels, data: babyBottleData} = this.getBabyBottleData();
        const {data: breastFeedData} = this.getBreastFeedData();
        const {data: rightBreastData} = this.getRightBreastFeedData();
        const {data: leftBreastData} = this.getLeftBreastFeedData();
        this.feedChart = new Chart(this.feedContainerRef.current!, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    yAxisID: 'babyBottleAxis',
                    label: 'Biberon (mL)',
                    data: babyBottleData,
                    backgroundColor: 'lightblue'
                },
                {
                    yAxisID: 'breastFeedAxis',
                    label: 'Sein (min)',
                    data: breastFeedData,
                    backgroundColor: 'green'
                },
                {
                    yAxisID: 'breastFeedAxis',
                    label: 'Sein G (min)',
                    data: leftBreastData,
                    backgroundColor: 'lightgreen'
                },
                {
                    yAxisID: 'breastFeedAxis',
                    label: 'Sein D (min)',
                    data: rightBreastData,
                    backgroundColor: 'darkgreen'
                }
            ]
            },
            options: {
                scales: {
                    breastFeedAxis: {
                        position: 'right',
                      }
                },
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        maxHeight: 50
                    }
                }
            }
        });

        const {data: peeData} = this.getDiapersPeeData();
        const {data: stoolData} = this.getDiapersStoolData();
        this.diaperChart = new Chart(this.diaperContainerRef.current!, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Pipi',
                    data: peeData,
                    backgroundColor: 'lightblue'
                },
                {
                    label: 'Caca',
                    data: stoolData,
                    backgroundColor: 'orange'
                }
            ]
            },
            options: {
                aspectRatio: 1.5
            }
        });

        const {data: activeData, labels: activeLabels} = this.getActiveTime();
        this.activeChart = new Chart(this.activeContainerRef.current!,  {
            type: 'radar',
            data: {
                labels: activeLabels,
                datasets: [{
                    label: 'Heures actives (% sur la p??riode)',
                    data: activeData,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }
                ]

            }
        })
    }

    private updateCharts() {
        const {labels, data: babyBottleData} = this.getBabyBottleData();
        const {data: breastFeedData} = this.getBreastFeedData();
        const {data: rightBreastData} = this.getRightBreastFeedData();
        const {data: leftBreastData} = this.getLeftBreastFeedData();
        this.feedChart.data = {
                labels,
                datasets: [{
                    yAxisID: 'babyBottleAxis',
                    label: 'Biberon (mL)',
                    data: babyBottleData,
                    backgroundColor: 'lightblue'
                },
                {
                    yAxisID: 'breastFeedAxis',
                    label: 'Sein (min)',
                    data: breastFeedData,
                    backgroundColor: 'green'
                },
                {
                    yAxisID: 'breastFeedAxis',
                    label: 'Sein G (min)',
                    data: leftBreastData,
                    backgroundColor: 'lightgreen'
                },
                {
                    yAxisID: 'breastFeedAxis',
                    label: 'Sein D (min)',
                    data: rightBreastData,
                    backgroundColor: 'darkgreen'
                }
            ]
            };

        const {data: peeData} = this.getDiapersPeeData();
        const {data: stoolData} = this.getDiapersStoolData();
        this.diaperChart.data = {
                labels,
                datasets: [{
                    label: 'Pipi',
                    data: peeData,
                    backgroundColor: 'lightblue'
                },
                {
                    label: 'Caca',
                    data: stoolData,
                    backgroundColor: 'orange'
                }
            ]
            };

        const {data: activeData, labels: activeLabels} = this.getActiveTime();
        this.activeChart.data = {
                labels: activeLabels,
                datasets: [{
                    label: 'Heures actives (% sur la p??riode)',
                    data: activeData,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }
                ]
        };

        this.feedChart.update();
        this.diaperChart.update();
        this.activeChart.update();
    }

    private getBabyBottleData = () => {
        return this.extractData([BABY_BOTTLE_TYPE], (d: DataModel) => {
            return d.quantity!
        }, 1);
    }

    private getBreastFeedData = () => {
        return this.extractData([LEFT, RIGHT], (d: DataModel) => {
            return Math.round(d.duration! / 60);
        });
    }

    private getRightBreastFeedData = () => {
        return this.extractData([RIGHT], (d: DataModel) => {
            return Math.round(d.duration! / 60);
        });
    }


    private getLeftBreastFeedData = () => {
        return this.extractData([LEFT], (d: DataModel) => {
            return Math.round(d.duration! / 60);
        });
    }

    private getDiapersPeeData = () => {
        return this.extractData([PEE], (d: DataModel) => {
            return 1
        }, 1);
    }

    private getDiapersStoolData = () => {
        return this.extractData([STOOL], (d: DataModel) => {
            return 1
        }, 1);
    }

    private getActiveTime = () => {
        let {start, end} = this.getPeriodThreshold();
        end = Math.min(end, Math.round(Date.now() / 1000));
        const nbDays = Math.round((end - start) / 24 / 60 / 60);
        const data = this.props.data.filter((d) => d.start >= start && d.start < end);
        const results: {[date: string]: Array<boolean>} = {};
        data.forEach((d) => {
            const start = d.start;
            const end = d.start + (d.duration || 0);
            const startDate = new Date(start * 1000);
            const endDate = new Date(end * 1000);
            const startKey = formatDate2(start * 1000, false);
            const endKey = formatDate2(end * 1000, false);
            const startHour = startDate.getHours();
            const endHour = endDate.getHours();
            const updateResults = (dayKey: string, hour: number) => {
                let hourArray = results[dayKey];
                if (!hourArray) {
                    hourArray = new Array(24).fill(false);
                    results[dayKey] = hourArray;
                }
                hourArray[hour] = true;
            }
            if (endHour < startHour) {
                for (let i = startHour; i < 24; i++) {
                    updateResults(startKey, i);
                }
                for (let i = 0; i <= endHour; i++) {
                    updateResults(endKey, i);
                }
            } else {
                for (let i = startHour; i <= endHour; i++) {
                    updateResults(startKey, i);
                }
            }
        });


        const labels = [];
        for (let i = 0; i < 24; i++) {
            labels.push(i + 'h');
        }
        return {
            labels,
            data: this.getActivePercentage(nbDays, results)
        };
    }

    private getActivePercentage(nbDays: number, results: {[date: string]: Array<boolean>}) {
        const data: Array<number> = new Array(24).fill(0);
        Object.values(results).forEach((r) => {
            for (let i = 0; i < 24; i++) {
                data[i] += (r[i] as any as number);
            }
        });
        return data.map((d) => Math.round(d/nbDays * 100));
    }

    private getData = (start: number, end: number, types: string[], getCurrentValue: (d: DataModel) => number, nbDecimals: number) => {
        const nbDays = Math.max(1, Math.round((Math.min(end, Math.round(Date.now() / 1000)) - start) / (24 * 60 * 60)));
        const roundingFactor: number = Math.pow(10, nbDecimals);
        return Math.round(this.props.data.reduce((previousValue: number, currentValue: DataModel) => {
            const isValid = types.includes(currentValue.type) && start <= currentValue.start && end > currentValue.start;
            return previousValue + (isValid ? getCurrentValue(currentValue) : 0);
        }, 0) / nbDays * roundingFactor) / roundingFactor;
    }

    private extractData = (types: string[], getCurrentValue: (d: DataModel) => number, nbDecimals: number = 0) => {
        const labels: any[] = [];
        const data: number[] = [];
        let date: number = this.state.startDate;
        switch(this.state.mode) {
            case Mode.WEEKS: {
                for (let i = 0; i < 6; i++) {
                    const {start, end} = this.getWeeksThreshold(date);
                    const value = this.getData(start, end, types, getCurrentValue, nbDecimals);
                    date = end;
                    labels.push([`${formatDate2(start * 1000, false)}`,` ?? ${formatDate2(end * 1000, false)}`]);
                    data.push(value);
                }
                break;
            }
            case Mode.WEEK: {
                for (let i = 0; i < 8; i++) {
                    const {start, end} = this.getDayThreshold(date);
                    const value = this.getData(start, end, types, getCurrentValue, nbDecimals);
                    date = end;
                    labels.push(formatDate2(start * 1000, false));
                    data.push(value);
                }
                break;
            }
            default: {
                for (let i = 0; i < 13; i++) {
                    const {start, end} = this.getMonthThreshold(date);
                    const value = this.getData(start, end, types, getCurrentValue, nbDecimals);
                    date = end;
                    const realDate = new Date(start * 1000);
                    labels.push(`${MONTHS[realDate.getMonth()]} ${realDate.getFullYear()}`);
                    data.push(value);
                }
                break;
            }
        }
        return {data, labels};
    }

    private getDayThreshold(time: number) {
        const d = new Date(time * 1000);
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000;
        const end = start + 24 * 60 * 60;
        return {start, end};
    }

    private getWeeksThreshold(time: number) {
        const d = new Date(time * 1000);
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000;
        const end = start + 7 * 24 * 60 * 60;
        return {start, end};
    }


    private getPeriodThreshold() {
        const start = this.state.startDate;
        let date = this.state.startDate;
        switch(this.state.mode) {
            case Mode.WEEKS: {
                for (let i = 0; i < 6; i++) {
                    date = this.getWeeksThreshold(date).end;
                }
                break;
            }
            case Mode.WEEK: {
                for (let i = 0; i < 8; i++) {
                    date = this.getDayThreshold(date).end;
                }
                break;
            }
            default: {
                for (let i = 0; i < 13; i++) {
                    date = this.getMonthThreshold(date).end;
                }
                break;
            }
        }
        return {start, end: date};
    }

    private getMonthThreshold(time: number) {
        const d = new Date(time * 1000);
        const year = d.getFullYear();
        const month = d.getMonth();
        const nextMonth = (month + 1) % 12;
        let nextYear = nextMonth ? year : year + 1;
        const start = new Date(year, month).getTime() / 1000;
        const end = new Date(nextYear, nextMonth).getTime() / 1000;
        return {start, end};
    }

    public render() {
        if (this.feedContainerRef.current && this.diaperContainerRef.current) {
            this.updateCharts();
        }
        return <>
            <div>
                <FormControl>
                    <Select value={this.state.mode} onChange={this.onModeChange} MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}>
                        <MenuItem value={Mode.MONTHS}>Mois</MenuItem>
                        <MenuItem value={Mode.WEEKS}>Semaines</MenuItem>
                        <MenuItem value={Mode.WEEK}>Jours</MenuItem>
                    </Select>
                </FormControl>
                    <Button style={{
                        padding: '0',
                        minWidth: '20px'
                    }} size='small' onClick={this.previousDate} variant='contained' color='primary'>{"<"}</Button>
                    <Input
                        style={{
                            margin: '0 10px' 
                        }}
                        type='date'
                        value={getInputFormattedTime(this.state.startDate, false)}
                        onChange={this.onStartDateChange}
                    />
                    <Button style={{
                        padding: '0',
                        minWidth: '20px'
                    }}  size='small' onClick={this.nextDate} variant='contained' color='primary'>{">"}</Button>

            </div>
            <div>
                <canvas ref={this.feedContainerRef} />
                <canvas ref={this.diaperContainerRef} />
                <canvas ref={this.activeContainerRef} />
            </div>
            </>;
    }

    private onModeChange = (event: ChangeEvent<{name?: string, value: unknown}>) => {
        const newMode = event.target.value as Mode;
        const defaultDate = this.getDefaultDate(newMode);
        this.setState({
            mode: newMode,
            startDate: defaultDate});
    }

    private onStartDateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const date = new Date(event.target.value);
        this.setState({startDate: date.getTime() / 1000});
    }

    private nextDate = () => {
        this.updateDate('+');
    }

    private previousDate = () => {
        this.updateDate('-');
    }

    private updateDate(operation: '+' | '-') {
        const newDate = this.getDefaultDate(this.state.mode, this.state.startDate, operation);
        this.setState({startDate: newDate});
    }

    private getDefaultDate = (mode: Mode, date?: number, operation?: '+' | '-', ) => {
        const factor = operation === '+' ? -1 : 1; 
        const today = date || Math.floor(Date.now() / 1000);
        switch(mode) {
            case Mode.MONTHS:{
                return today - factor * 365 * 24 * 60 * 60;
            }
            case Mode.WEEKS: {
                return today - factor * 5 * 7 * 24 * 60 * 60;
            }
            default: {
                return today - factor * 7 * 24 * 60 * 60;
            }
        }
    }
}

const mapState = (state: RootState) => {
    const babyBottleData: DataModel[] = Object.values(state.babyBottle.data).map((babyData => {
        return {type: BABY_BOTTLE_TYPE, start: babyData.start, duration: babyData.duration, quantity: babyData.quantity };
    }));
    const breastFeedData: DataModel[]  = Object.values(state.breastFeed.data).map((data => {
        return {type: data.type, start: data.start, duration: data.duration };
    }));
    const diaperData: DataModel[]  = Object.values(state.diaper.data).map((data => {
        return {type: data.type, start: data.start };
    }));
    const data: DataModel[] = [...babyBottleData, ...breastFeedData, ...diaperData];
    data.sort((a: DataModel, b: DataModel) => {
        return b.start - a.start;
    })

    return {
        data
    };
}

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const SummaryChart = connector(SummaryChartBase);