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
    if(['Checkbox Input', 'Date Input', 'Dropdown Input', 'Initials Input', 'Signature Input', 'Text Input'].indexOf(kind) != -1)
        return 'field'
    return null;
}

export const setFieldDefaults = (kind, newItem) => {
    if(kind == 'Date Input'){
        newItem.value = '2019-01-01'
    }else if(kind == 'Initials Input'){
        newItem.value = 'TEXT'
    }else if(kind == 'Checkbox Input'){
        newItem.value = 'Label';
        newItem.checked = false;
    }else if(kind == 'Dropdown Input'){
        newItem.options = {
            'Option 1': 'Option 1', 
            'Option 2': 'Option 2', 
            'Option 3': 'Option 3'
        }
        newItem.value = 'Option 1';
    }else if(kind == 'Signature Input'){
        newItem.styles.lineWidth = 5;
        newItem.value = ''
    }else{
        newItem.value = 'Your Text'
    }
}

export const setBlockDefaults = (kind, newItem) => {
    newItem.children = {}
    if(kind == 'Cover Page'){
        console.log('aaa');
        // newItem.chilren = {
            
        // }
    }else if(kind == 'Image'){
        newItem.styles.backgroundImage  = '',
        newItem.styles.backgroundRepeat = 'no-repeat';
        newItem.styles.backgroundPosition = [0, 0];
        newItem.styles.backgroundSize = [100, 100]
    }else{
        newItem.styles.backgroundColor = '#ffffff'
    }
}
