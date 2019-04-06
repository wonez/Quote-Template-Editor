export const getItemType = (text) => {
    let kind = text;
    try {
        Array.from(kind).forEach((chr, i) => {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(chr) != -1)
                throw i;
        })
    } catch (i) {
        kind = kind.substring(0, i)
    }
    if (['Cover Page', 'Heading', 'Image', 'Page Break', 'Paragraph', 'Pricing Table', 'Table', 'Terms Of Service'].indexOf(kind) != -1)
        return 'block'
    if (['Checkbox Input', 'Date Input', 'Dropdown Input', 'Initials Input', 'Signature Input', 'Text Input'].indexOf(kind) != -1)
        return 'field'
    return null;
}

export const setFieldDefaults = (kind, newItem) => {
    if (kind == 'Date Input') {
        newItem.value = '2019-01-01'
    } else if (kind == 'Initials Input') {
        newItem.value = 'TEXT'
    } else if (kind == 'Checkbox Input') {
        newItem.value = 'Label';
        newItem.checked = false;
    } else if (kind == 'Dropdown Input') {
        newItem.options = {
            'Option 1': 'Option 1',
            'Option 2': 'Option 2',
            'Option 3': 'Option 3'
        }
        newItem.value = 'Option 1';
    } else if (kind == 'Signature Input') {
        newItem.styles.lineWidth = 5;
        newItem.value = ''
    } else {
        newItem.value = 'Your Text'
    }
}

export const handleBackground = (styles) => {
    return {
        backgroundImage: `url('${styles.backgroundImage}')`,
        backgroundPosition: `${styles.backgroundPosition[0]}px ${styles.backgroundPosition[1]}px`,
        backgroundSize: `${styles.backgroundSize[0]}px ${styles.backgroundSize[1]}px`,
        backgroundRepeat: styles.backgroundRepeat
    }
}

export const setBlockDefaults = (kind, newItem) => {
    newItem.children = {}
    newItem.styles.width = "95%";
    newItem.blockName = `${kind} Block`
    if (kind == 'Cover Page') {
        newItem.styles.backgroundColor = '#ffffff'
        newItem.styles.height = "95%"
        newItem.styles.textAlign = 'center'
        newItem.styles.backgroundImage = '',
        newItem.styles.backgroundRepeat = 'no-repeat';
        newItem.styles.backgroundPosition = [0, 0];
        newItem.styles.backgroundSize = [100, 100]
        newItem.children = {
            'Title': {
                kind: 'Text Input',
                id: 'Title',
                type: 'field',
                x: 300,
                y: 60,
                styles: {
                    backgroundColor: '#ffffff',
                    fontSize: 25,
                    color: '#000000',
                    width: '6rem',
                    height: '4rem'
                },
                value: 'Title'
            },
            'Subtitle': {
                kind: 'Text Input',
                id: 'Subtitle',
                type: 'field',
                x: 300,
                y: 110,
                styles: {
                    backgroundColor: '#ffffff',
                    fontSize: 15,
                    color: '#777777',
                    width: '6rem',
                    height: '3rem'
                },
                value: 'Subtitle'
            },
            'Logo': {
                kind: 'Logo',
                id: 'Logo',
                type: 'field',
                x: 300,
                y: 150,
                styles: {
                    width: '100px',
                    backgroundImage: '',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: [0, 0],
                    backgroundSize: [100, 100],
                    height: '100px'
                }
            },
            'Name': {
                kind: 'Text Input',
                id: 'Name',
                type: 'field',
                x: 300,
                y: 280,
                styles: {
                    backgroundColor: '#ffffff',
                    fontSize: 10,
                    color: '#000000',
                    width: '9rem',
                    height: '2rem'
                },
                value: 'Customer Name'
            },
            'Text Input1552239014633': {
                kind: 'Text Input',
                id: 'Text Input1552239014633',
                type: 'field',
                x: 50,
                y: 330,
                styles: {
                    backgroundColor: '#eeeeee',
                    fontSize: 10,
                    color: '#000000',
                    width: '95%',
                    height: '20rem'
                },
                value: 'Your Text'
            }
        }
    } else if (kind == 'Image') {
        newItem.styles.backgroundImage = '',
        newItem.styles.backgroundRepeat = 'no-repeat';
        newItem.styles.backgroundPosition = [0, 0];
        newItem.styles.backgroundSize = [100, 100]
    } else if (kind == 'Table') {
        newItem.children = undefined
        newItem.table = {
            "Column 1": {
                header: 'Column Header',
                cells: {
                    'Item 1': 'New Item',
                    'Item 2': 'New Item',
                    'Item 3': 'New Item',
                }
            },
            "Column 2": {
                header: 'Column Header',
                cells: {
                    'Item 4': 'New Item',
                    'Item 5': 'New Item',
                    'Item 6': 'New Item',
                }
            },
            "Column 3": {
                header: 'Column Header',
                cells: {
                    'Item 7': 'New Item',
                    'Item 8': 'New Item',
                    'Item 9': 'New Item',
                }
            },
        }
        newItem.styles.backgroundColor = '#ffffff'
    } else if (kind == 'Pricing Table') {
        newItem.children = undefined
        newItem.table = {
            "Name": {
                header: 'Name',
                cells: {
                    'Item 1': 'New Item',
                    'Item 2': 'New Item',
                    'Item 3': 'New Item',
                }
            },
            "Price": {
                header: 'Price',
                cells: {
                    'Item 1': "0.00",
                    'Item 2': "0.00",
                    'Item 3': "0.00",
                }
            },
            "QTY": {
                header: 'QTY',
                cells: {
                    'Item 1': "1",
                    'Item 2': "1",
                    'Item 3': "1",
                }
            },
            "Subtotal": {
                header: 'Subtotal',
                cells: {
                    'Item 1': "0.00",
                    'Item 2': "0.00",
                    'Item 3': "0.00",
                }
            },
        }
        newItem.discount = 0;
        newItem.styles.backgroundColor = '#ffffff'
    } else if(kind == 'Terms Of Service'){
        newItem.children = undefined;
        newItem.text = ''
    }else { 
        newItem.styles.backgroundColor = '#ffffff'
    }
}
