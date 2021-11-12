const initialValue = model => {

    let obj = {}
    model.fields.map(x => x).filter(f => f.type !== 'fk').map( (item, idx) => {
            
        obj[item.id] = item.defaultValue ? item.defaultValue : null

        return obj
    })

    return obj
}

export default initialValue