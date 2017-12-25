// Avec plus de temps, j'aurai utilisé Axios Adaptater il me semble (?)
// pour pouvoir simuler des POST sur la db, sans la modifier. En bref,
// pouvoir tester réellement la méthode POST dans mon fichier App. Ici
// je teste l'ajout de data au state uniquement. 

const newJedi = (list, item) => {
    return { 'jedi': [...list.jedi, item] }
}

const deleteJedi = (list, deleted) => {
    const deletedIndex = list.jedi.findIndex(item => item.id === deleted.id) 
    return [
        ...list.jedi.slice(0, deletedIndex),
        deleted,
        ...list.jedi.slice(deletedIndex + 1)
    ]
}
test('newJedi should add a jedi to the list', () => {
    const startData = {
        'jedi': [
            { id: 1, name: 'Qui Gon Jinn' },
            { id: 2, name: 'Mace Windu' }
        ]
    }

    const newData = { id: 3, name: 'Aayla Secura' }
    const expected = {
        'jedi': [
            { id: 1, name: 'Qui Gon Jinn' },
            { id: 2, name: 'Mace Windu' },
            { id: 3, name: 'Aayla Secura' }
        ]
    }

    const result = newJedi(startData, newData)

    expect(result).toEqual(expected)
})

test('newJedi should not mutate the existing jedis array', () => {
    const startData = {
        'jedi': [
            { id: 1, name: 'Qui Gon Jinn' },
            { id: 2, name: 'Mace Windu' }
        ]
    }

    const newData = { id: 3, name: 'Aayla Secura' }

    const result = newJedi(startData, newData)

    expect(result).not.toBe(startData)
})


test('deleteJedi should delete and item by id', () => {
    const startData = {
        'jedi': [
            { id: 1, name: 'Qui Gon Jinn' },
            { id: 2, name: 'Mace Windu' },
            { id: 3, name: 'Aayla Secura' }
        ]
    }

    const deletedData = { id: 2, name: 'Mace Windu' }

    const expected = {
        'jedi': [
            { id: 1, name: 'Qui Gon Jinn' },
            { id: 3, name: 'Aayla Secura' }
        ]
    }

    const result = deleteJedi(startData, deletedData)

    expect(result).not.toBe(expected)
})