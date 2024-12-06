let pustyKoszyk = true;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let zamowienie;

function checkoutCalc()
{
    let koszyk = document.getElementById('koszyk');
    koszyk.innerHTML = '';
    zamowienie = '';

    let uslugi = [0, 0, 0, 0, 0, 0, 0, 0];
    let ilosc = [0, 0, 0, 0, 0, 0, 0, 0];
    const nazwaUslugi = [
        "Naprawa silnika",
        "Wymiana oleju",
        "Naprawa układu hamulcowego",
        "Wymiana opon",
        "Diagnostyka komputerowa",
        "Naprawa zawieszenia",
        "Usługi blacharskie",
        "Serwis klimatyzacji"
    ]

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
        if (ilosc[i] > 0)
        {
            const item = document.createElement('p');
            const itemContent = 
            document.createTextNode(ilosc[i] + " x " + nazwaUslugi[i] + " = " + uslugi[i] + "zł");
            item.appendChild(itemContent);
            koszyk.appendChild(item);

            zamowienie += ilosc[i] + " x " + nazwaUslugi[i] + ",\n";
        }

        lacznie += uslugi[i];
    }

    if (!koszyk.innerHTML)
    {
        const pusty = document.createElement('p');
        const pustyContent = document.createTextNode("Koszyk jest pusty.");
        pusty.appendChild(pustyContent);
        koszyk.appendChild(pusty);

        pustyKoszyk = true;
    } else
    {
        pustyKoszyk = false;
    }

    document.getElementById('lacznie').innerHTML = lacznie;

}
function checkoutClear()
{
    for (let i = 0; i <= 7; i++)
    {
        document.getElementById(`usluga${i}`).value = 0;
    }
    checkoutCalc();
}
async function checkoutContinue()
{
    if (pustyKoszyk)
    {
        alert("Twój koszyk jest pusty.");
        return;
    }

    let numer = prompt("Podaj numer telefonu do kontaktu:");

    if (!numer || numer.length != 9 || isNaN(parseInt(numer)))
    {
        alert("Spróbuj ponownie");
        return;
    }

    const webhookBody = {
        embeds: [{
          title: 'Nowe zamówienie!',
          fields: [{
              name: 'Numer telefonu:',
              value: numer
            },
            {
              name: 'Zamówienie:',
              value: zamowienie
            },
          ]
        }],
      };
    const webhookUrl = 'https://discord.com/api/webhooks/1312443957686439997/8mxzK18DCxF87IUcIV8zZ3drTItIIWil_3ipQu7r77cxAA43s2QBy_uJJjHMaeAHxsuu';
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookBody),
    });
    if (response.ok)
    {
        alert('Zamówienie złożono pomyślnie.\nDziękujemy!');
    } else
    {
        alert('Wystąpił jakiś problem.\nSpróbuj ponownie.');
    }
}
async function kontaktSend() {
    let canSend = false;

    ename = document.getElementById('errorname');
    enumber = document.getElementById('errornumber');
    eemail = document.getElementById('erroremail');
    emsg = document.getElementById('errormsg');

    ename.innerHTML = "";
    enumber.innerHTML = "";
    eemail.innerHTML = "";
    emsg.innerHTML = "";


    const name = document.getElementById('clientname').value;
    if (!name)
    {
        ename.innerHTML = "Podaj imię i nazwisko";
        canSend = false;
    } else
    {
        canSend = true;
    }

    const number = document.getElementById('clientnumber').value;
    if (!number || number.length != 9)
    {
        enumber.innerHTML = "Podaj prawidłowy numer telefonu";
        canSend = false;
    } else
    {
        canSend = true;
    }

    const email = document.getElementById('clientemail').value;
    if (!email || !emailRegex.test(email))
    {
        eemail.innerHTML = "Podaj prawidłowy adres email";
        canSend = false;
    } else
    {
        canSend = true;
    }

    const msg = document.getElementById('clientmsg').value;
    if (!msg)
    {
        emsg.innerHTML = "Wiadomość nie może być pusta";
        canSend = false;
    } else
    {
        canSend = true;
    }

    if (!canSend)
    {
        return;
    }

    const webhookBody = {
      embeds: [{
        title: 'Nowa wiadomość!',
        fields: [{
            name: 'Imię i nazwisko:',
            value: name
          },
          {
            name: 'Numer telefonu:',
            value: number
          },
          {
            name: 'Adres email:',
            value: email
          },
          {
            name: 'Wiadomość:',
            value: msg
          }
        ]
      }],
    };
    const webhookUrl = 'https://discord.com/api/webhooks/1312440874747301958/jtepbpGuzYTAvINwkVCCPyOMTX3YjS4eWHJjyu73e22ne0Wig1hqy2kWLRpT3NjN2pSV';
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });
    if (response.ok) {
      alert('Otrzymaliśmy twoją wiadomość.');

        document.GetElementById('clientname').value = '';
        document.GetElementById('clientnumber').value = '';
        document.GetElementById('clientemail').innerHTML = '';
        document.GetElementById('clientmsg').innerHTML = '';
    } else {
      alert('Wystąpił jakiś problem.\nSpróbuj ponownie.');
    }
    
}
