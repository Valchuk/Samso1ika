let $body = $('body');
let $table = $('.user-form__table table');

let data = `[{
              "id": 1,
              "first_name": "Jonathan",
              "last_name": "Mendoza",
              "email": "jmendoza0@posterous.com",
              "gender": "Male"
          }, {
              "id": 2,
              "first_name": "Sandra",
              "last_name": "Payne",
              "email": "spayne1@unc.edu",
              "gender": "Female"
          }, {
              "id": 3,
              "first_name": "Denise",
              "last_name": "Rodriguez",
              "email": "drodriguez2@slashdot.org",
              "gender": "Female"
          }, {
              "id": 4,
              "first_name": "Irene",
              "last_name": "Armstrong",
              "email": "iarmstrong3@blogspot.com",
              "gender": "Female"
          }, {
              "id": 5,
              "first_name": "Raymond",
              "last_name": "Moreno",
              "email": "rmoreno4@rakuten.co.jp",
              "gender": "Male"
          }]`

let parsedData = JSON.parse(data);

class userTableMaster {
    constructor(table, parsedData) {
        this.table = table;
        this.parsedData = parsedData;
    }
  
    renderTable () {
        let $tableContent = this.table.find('tbody');

        if (parsedData.length) {
          this.table.show();
        }

        for (let rowData of Object.values(parsedData)) {
            let row = $tableContent[0].insertRow();

            for (let [key, value] of Object.entries(rowData)) {
                if (key !== 'id') {
                    if (key !== 'last_name') {
                        let cell = row.insertCell();
                        
                        cell.innerHTML = value;
                    }
                    else {
                        let cell = row.lastChild;

                        cell.innerText =  cell.innerText + ' ' + value;
                    }
                }
                
            }       
        }
    }

    fieldValidation(item) {
        let currentInput = item;
        let regular;

        if (currentInput.type == 'text') {
            regular = /^[A-Za-z]+$/
        } else if (currentInput.type == 'email') {
            regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }

        if (!currentInput.value.match(regular)) {
            $(currentInput).parent().addClass('warning');
            return false
        } else {
            $(currentInput).parent().removeClass('warning');
            return true
        }
    }

    clearInputs (inputs) {
        inputs.each(function() {
            $(this).not('select').val('');
        })
    }

    addUser () {
        let that = this,
            isValid = true,
            inputArrays = $('.user-form__inputs input'),
            infoData = [];

        inputArrays.each(function() {
           isValid *= that.fieldValidation(this, isValid);
        });

        inputArrays.push($('#gender'));

        if ( isValid ) {
            inputArrays.each(function(){
                infoData.push($(this).val())
            })

            infoData.splice(0,2, `${infoData[0]}, ${infoData[1]}`);

            let infoTableRow = this.table[0].insertRow(),
                infoTableCell;

            for (let i = 0; i < infoData.length; i++) {
                infoTableCell = infoTableRow.insertCell(i);
                infoTableCell.innerText = infoData[i];
            }

            this.clearInputs(inputArrays);

        }
    }

    filterTable(text) {
        let $filterRow = this.table.find('tbody tr'),
            compareText;

        $filterRow.each(function() {
            compareText = $(this).first().text().toUpperCase();

            compareText.includes(text.toUpperCase()) ? $(this).show() : $(this).hide();
        })
    }
   
}

let newTable = new userTableMaster($table, data)

newTable.renderTable();

$('#search').on('input', function(){
    newTable.filterTable($(this).val());
})