module.exports = function makeHealthCheckAction({ loginAdmin, formatResponse, mongoose }) {
    return async function healthCheckAction({ req }) {
        try {
            console.info(`_healthCheck
        } catch (error) {
            console.error('Error at healthCheckAction', error);
            return formatResponse({
                status: 500,
                data: null,
                message: `Health check failed: ${error.message}`
            });
        }
    };
};
