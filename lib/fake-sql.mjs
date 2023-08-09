export const from = (table, conditions) => {
    if (conditions === undefined) {
        return database[table];
    } else {
        return eval(`database[table].filter((${table}) => {
            return ${conditions.where}
        })`)
    }
}

export const select = (columns, result) => {
    switch(columns) {
        case '*':
            columns = Object.keys(result[0]);
        
        case 'count':
            return result.length;

        default: 
            columns = columns.split(', ');
    }

    if (result === undefined) return [];
    return result.map(row => columns.map((column) => {
        if (row[column] === undefined) {
            return null;
        } else {
            return row[column];
        }
    }).reduce((a, v, i) => ({...a, [columns[i]]: v}), {}))
}