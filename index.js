// index.js

import EditorJS from 'editor-js';
import Underline from '@editorjs/underline';
import Tooltip from 'editorjs-tooltip';
import Strikethrough from '@sotaproject/strikethrough';
import ColorPlugin from 'editorjs-text-color-plugin';
import TextVariantTune from '@editorjs/text-variant-tune';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import Alert from 'editorjs-alert';
import editorjsColumns from '@calumk/editorjs-columns';
import editorjsParagraphLinebreakable from '@calumk/editorjs-paragraph-linebreakable';
// import AIText from '@alkhipce/editorjs-aitext';
import ChangeCase from 'editorjs-change-case';
// import InlineImage from 'editorjs-inline-image';
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
//Custom Plugins
import AaldaMedicine from 'aalda-medicine-plugin'
import AaldaKeyVital from 'aalda-key-vital-plugin';
import AaldaTestReport from 'aalda-test-report-plugin';
import AaldaDelimiter from 'aalda-delimiter-plugin';
import AaldaObservation from 'aalda-observation-plugin';
import AaldaVacination from 'aalda-vaccination-plugin';
import AntiParasitic from 'aalda-anti-parasitic-plugin';
// Use the imported modules to configure Editor.js with the desired plugins
/**
 * 
 * {@config} Config for the Editor
 * {@tools} Config for 
 */
class AaldaEditor {
    constructor(config = {}) {
        this.config = config;
        this.editor = null;
        this.config.locale = config?.locale || 'en'
    }


    mergeObjectsByKey(baseObject, addObject, key) {
        if (!baseObject || !addObject) {
            return baseObject;
        }

        if (!baseObject[key] || !addObject[key]) {
            return baseObject;
        }

        const mergedObject = { ...baseObject };

        for (const propName in addObject[key]) {
            if (addObject[key].hasOwnProperty(propName)) {
                mergedObject[key][propName] = addObject[key][propName];
            }
        }

        return mergedObject;
    }


    init() {
        let column_tools = {
            header: {
                class: Header,
                inlineToolbar: true,
            },
            alert: Alert,
            paragraph: editorjsParagraphLinebreakable,
            delimiter: AaldaDelimiter,
            // table: {
            //     class: Table
            // }
        }
        let config = {
            autofocus: false,
            holder: this.config.holder || 'editorjs',
            placeholder: 'いらっしゃいませ。ここから始める...',
            tools: {
                header: {
                    class: Header,
                    config: {
                        placeholder: 'Enter a header',
                    },
                    inlineToolbar: true
                },
               
                table: {
                    class: Table,
                    inlineToolbar: true,
                    tunes: ['alignmentTool'],
                },
                alert: Alert,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                nestedList: {
                    class: NestedList,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    },
                },
                Color: {
                    class: ColorPlugin,
                    config: {
                        colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
                        defaultColor: '#FF1300',
                        type: 'text',
                        customPicker: true // add a button to allow selecting any colour  
                    }
                },
                Marker: {
                    class: ColorPlugin,
                    config: {
                        defaultColor: '#FFBF00',
                        type: 'marker',
                        icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                    }
                },
                underline: { class: Underline },
                textVariant: { class: TextVariantTune },
                strikethrough: { class: Strikethrough },
                list: {
                    class: List,
                    config: {
                        toolbar: ['Header']
                    },
                    // tunes: ['alignmentTool'],
                    inlineToolbar: true
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    // tunes: ['alignmentTool'],
                },
                alignmentTool: {
                    class: AlignmentTuneTool,
                    config: {
                        default: "left",
                        blocks: {
                            header: 'left',
                            list: 'left',
                        }
                    },
                    inlineToolbar: true
                },
                tooltip: {
                    class: Tooltip,
                    config: {
                        location: 'left',
                        highlightColor: '#FFEFD5',
                        underline: true,
                        backgroundColor: '#154360',
                        textColor: '#FDFEFE',
                    },
                    inlineToolbar: true
                },
                columns: {
                    class: editorjsColumns,
                    config: {
                        EditorJsLibrary: EditorJS, // Pass the library instance to the columns instance.
                        tools: column_tools // IMPORTANT! ref the column_tools
                    }
                },

                // medicine: {
                //     class: AaldaMedicine,
                //     inlineToolbar: true,
                // },
                delimiter: {
                    class: AaldaDelimiter,
                },
                vitals : {
                    class: AaldaKeyVital,
                    inlineToolbar: true,
                    config: {
                        locale: this.config?.locale
                    }
                },
                peros: {
                    class: AaldaObservation,
                    // inlineToolbar: true,
                    config: {
                        locale: this.config?.locale
                    }
                },
                testReport: {
                    class: AaldaTestReport,
                    config: {
                        locale: this.config?.locale,
                        apiUrl: this.config?.api?.test || "http://localhost:8000/api/medicine"
                    }
                },
                vaccination :{
                    class: AaldaVacination,
                    inlineToolbar: true,
                    config: {
                        locale: this.config?.locale,
                        apiUrl: this.config?.api?.vaccination || "http://localhost:8000/api/medicine"
                    }
                },
                antiParasitic :{
                    class: AntiParasitic,
                    inlineToolbar: true,
                    config: {
                        locale: this.config?.locale,
                        apiUrl: this.config?.api?.medicine || "http://localhost:8000/api/medicine"
                    }
                }
            },
            data: {},

            /**
             * onReady callback
             */
            onReady: () => {
                new Undo({ editor: this.editor });
                new DragDrop(this.editor);

                // console.log('Aalda editor is ready to work!')
            },

            /**
             * onChange callback
             */
            onChange: (api, event) => {
                if (this.config?.onChange) {
                    this.config?.onChange(api, event)
                }
            },
            // tunes: ['textVariant', 'alignmentTool'],
            /**
             * Internationalzation config
             */
            i18n: {
                /**
                 * @type {I18nDictionary}
                 */
                messages: {
                    /**
                     * Other below: translation of different UI components of the editor.js core
                     */
                    ui: {
                        "blockTunes": {
                            "toggler": {
                                "Click to tune": "クリックしてチューニング",
                                "or drag to move": "またはドラッグして移動します"
                            },
                        },
                        "inlineToolbar": {
                            "converter": {
                                "Convert to": "に変換"
                            }
                        },
                        "toolbar": {
                            "toolbox": {
                                "Add": "追加"
                            }
                        }
                    },

                    /**
                     * Section for translation Tool Names: both block and inline tools
                     */
                    toolNames: {
                        "Text": "文章",
                        "Heading": "見出し",
                        "List": "リスト",
                        "Warning": "警告",
                        "Checklist": "チェックリスト",
                        "Delimiter": "デリミタ",
                        "Table": "テーブル",
                        "Link": "リンク",
                        "Marker": "マーカー",
                        "Bold": "大胆な",
                        "Italic": "イタリック",
                        "Alert": 'アラート',
                        "Peros": "身体検査所見",
                        "Vaccination": "予防接種",
                        "Vitals":"バイタル"
                    },

                    /**
                     * Section for passing translations to the external tools classes
                     */
                    tools: {
                        /**
                         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
                         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
                         */
                        "warning": { // <-- 'Warning' tool will accept this dictionary section
                            "Title": "タイトル",
                            "Message": "メッセージ",
                        },

                        /**
                         * Link is the internal Inline Tool
                         */
                        "link": {
                            "Add a link": "リンクを追加する"
                        },
                        /**
                         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
                         */
                        "stub": {
                            'The block can not be displayed correctly.': 'ブロックが正しく表示されません。'
                        },

                        "vitals": {
                            "Body Weight":"体重",
                            "Temprature":"温度",
                            "Heart Rate":"心拍数",
                            "Respiratory":"呼吸器系",
                            "Vitals":"バイタル",
                            "Value":"価値",
                            "Unit":"ユニット"
                        },

                        "peros":{
                           "PE/ROS": "観察",
                           "Observation":"観察",
                           "Result":"結果",
                           "Remarks":"備考",
                        },

                        "vaccination": {
                            "Vaccination":"予防接種"
                        }
                    },

                    /**
                     * Section allows to translate Block Tunes
                     */
                    blockTunes: {
                        /**
                         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                         *
                         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                         */
                        "delete": {
                            "Delete": "消去"
                        },
                        "moveUp": {
                            "Move up": "上に移動"
                        },
                        "moveDown": {
                            "Move down": "下に移動"
                        },
                    },
                }
            },
        }
        // Usage:

        config = this.mergeObjectsByKey(config, this.config, 'tools');
        config = this.mergeObjectsByKey(config, this.config, 'data');
        config = this.mergeObjectsByKey(config, this.config, 'i18n');
        if(this.config?.locale && this.config?.locale !== 'jp')
            delete config.i18n;

        config = this.mergeObjectsByKey(config, this.config, 'onReady');
        config = this.mergeObjectsByKey(config, this.config, 'onChange');
        config = this.mergeObjectsByKey(config, this.config, 'tunes');
        config = { ...config, holder: this.config?.holder || config.holder, placeholder: this.config?.placeholder || config.placeholder }
        this.editor = new EditorJS(config);

    }

    getInstance() {
        return this.editor;
    }

    destroy() {
        if ('destroy' in this.editor)
            this.editor.destroy()
    }
}

export default AaldaEditor;