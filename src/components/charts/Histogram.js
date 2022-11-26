import PropTypes from 'prop-types';
import { AnimatedAxis, AnimatedGrid, AnimatedBarSeries, XYChart } from '@visx/xychart';

function Histogram({ data, accessors }) {
    return (
        <XYChart
            height={500}
            xScale={{ type: 'band' }}
            yScale={{ type: 'linear' }}
        >
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left" />
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
};

export default Histogram;