# Setup Aalda Editor

To set up Aalda Editor, follow these instructions:

1. Download the Aalda Editor installation package from the official website

```jsx
npm i https://github.com/vishal-aalda/aalda-editor.git
```

2. Now we can use the following plugin based on Project

```jsx
const edit = new AaldaEditor({
                tools: {
                    changeCase: {//We need to manually pass this ChangeCase tool for now later we could incorporate this with custom plugin
                        class: ChangeCase,
                        inlineToolbar: true,
                    },
                },
                data,
                holder,
                onChange: (api, event) => {
                 api.saver.save().then(saveData);
                },
            });
            edit.init();
```

3. Start creating and editing your documents using Aalda Editor.

Remember to refer to the official documentation for detailed instructions and troubleshooting tips.

Happy editing with Aalda Editor!
