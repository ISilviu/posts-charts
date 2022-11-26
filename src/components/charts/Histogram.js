import PropTypes from 'prop-types';
import { AnimatedAxis, AnimatedGrid, AnimatedBarSeries, XYChart } from '@visx/xychart';

function Histogram({ data, accessors, yAxisLabel, xAxisLabel }) {
    return (
        <XYChart
            height={500}
            xScale={{ type: 'band' }}
            yScale={{ type: 'linear' }}
        >
            <AnimatedAxis label={xAxisLabel} orientation="bottom" />
            <AnimatedAxis label={yAxisLabel} orientation="left" />
            <AnimatedGrid columns={false} />
            <AnimatedBarSeries data={data} {...accessors} />
        </XYChart>
    );
}

Histogram.propTypes = {
    data: PropTypes.arrayOf(PropTypes.array),
    accessors: PropTypes.shape({
        xAccessor: PropTypes.func.isRequired,
        yAccessor: PropTypes.func.isRequired,
    }).isRequired,
    xAxisLabel: PropTypes.string.isRequired,
    yAxisLabel: PropTypes.string.isRequired,
};

export default Histogram;