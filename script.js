function checkoutCalc()
{
    let uslugi = [0, 0, 0, 0, 0, 0, 0, 0];
    let ilosc = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i <= 7; i++)
    {
        let element = document.getElementById(`usluga${i}`);

        if (element && element.value != null && element.value >= 0)
        {
            let value = parseInt(element.value)

            switch (i) {
                case 0:
                    uslugi[0] += 1500 * value;
                    ilosc[0] += value;
                    break;
                case 1:
                    uslugi[1] += 400 * value;
                    ilosc[1] += value;
                    break;
                case 2:
                    uslugi[2] += 500 * value;
                    ilosc[2] += value;
                    break;
                case 3:
                    uslugi[3] += 150 * value;
                    ilosc[3] += value;
                    break;
                case 4:
                    uslugi[4] += 150 * value;
                    ilosc[4] += value;
                    break;
                case 5:
                    uslugi[5] += 1000 * value;
                    ilosc[5] += value;
                    break;
                case 6:
                    uslugi[6] += 2500 * value;
                    ilosc[6] += value;
                    break;
                case 7:
                    uslugi[7] += 300 * value;
                    ilosc[7] += value;
                    break;
            }
        }
    }

    let lacznie = 0;

    for (let i = 0; i <= 7; i++)
    {
        document.getElementById(`wypis${i}`).innerHTML = ilosc[i];
        document.getElementById(`cena${i}`).innerHTML = uslugi[i];

        lacznie += uslugi[i];
    }

    document.getElementById('lacznie').innerHTML = lacznie;

}