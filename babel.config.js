module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    electron: '6.0',
                },
            },
        ],
    ],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
    ],
};
