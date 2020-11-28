module.exports = {
    api: {
        backend_api: process.env.BACKEND_API || 'http://localhost:8000',
    },
    stripe: {
        key: process.env.STRIPE_PUBLISHABLE || 'pk_test_V4hYfcXXV57TJlvhg0WISalx00bvZQy7GL',
        backend_api: process.env.PAYMENT_SERVER_URL || 'https://shield-backend.herokuapp.com'
    },

};
