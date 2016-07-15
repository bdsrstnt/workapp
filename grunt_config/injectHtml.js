module.exports = function (options, grunt) {

    grunt.loadNpmTasks("grunt-inline-angular-templates");

    return {
        distHtml: {
            options: {
                //base: 'src/main/webapp', // (Optional) ID of the <script> tag will be relative to this folder. Default is project dir.
                    prefix: '',            // (Optional) Prefix path to the ID. Default is empty string.
                    selector: 'body',       // (Optional) CSS selector of the element to use to insert the templates. Default is `body`.
                    method: 'prepend',       // (Optional) DOM insert method. Default is `prepend`.
                    unescape: {             // (Optional) List of escaped characters to unescape
                    '&lt;': '<',
                        '&gt;': '>',
                        '&apos;': '\'',
                        '&amp;': '&'
                }
            },
            files: {
                'dist/index.html': ['app/partials/*.html']
            }
        }
    };
};
