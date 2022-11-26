import PropTypes from 'prop-types';

function QueryStateHandler({ loading, error, loadingComponent, errorComponent, children }) {
    const renderContent = () => {
        let content = children;
        if (error) {
            content = errorComponent;
        } else if (loading) {
            content = loadingComponent;
        }
        return content;
    };

    return renderContent();
}

QueryStateHandler.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    error: PropTypes.object,
    loadingComponent: PropTypes.element,
    errorComponent: PropTypes.element,
};

export default QueryStateHandler;