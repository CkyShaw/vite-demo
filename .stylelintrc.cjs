module.exports = {
    extends: ['@qif/stylelint-config'],
    overrides: [
        {
            files: ['**/*.html'],
            extends: ['@qif/stylelint-config/css-html']
        },
        {
            files: ['**/*.scss'],
            extends: ['@qif/stylelint-config/scss']
        },
        {
            files: ['**/*.vue'], 
            extends: ['@qif/stylelint-config/scss-vue']
        }
    ]
}