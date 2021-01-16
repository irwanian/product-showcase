export const formatMoneyToIdr = (amount) => {
    const IDRFormat = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)

    return IDRFormat.replace(',00','')
}