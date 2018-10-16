
var vehicleType = document.getElementById('vehicle-type');
var groundVehiclesList = document.getElementById('ground-vehicles-list');
var airplanesList = document.getElementById('airplanes-list');

if (vehicleType) {
    var vehicleClass = document.getElementById('class');
    var vehicleName = document.getElementById('name');
    var t;

    vehicleType.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            t = a.getAttribute('data-vehicle-type')
            setVehicleType(t);
        });
    });

    t = window.location.hash.replace('#', '') || 'air';
    setVehicleType(t);

    [airplanesList, groundVehiclesList].forEach(function (list) {
        for (var i = 0; i < list.children.length; i++) {
            list.children[i]._title = list.children[i].querySelector('b').innerText.toLowerCase();
            list.children[i]._type = list.children[i].querySelector('small').innerText.toLowerCase();
        }
    });

    vehicleClass.addEventListener('change', function (e) {
        var val = vehicleClass.value;
        var list = t === 'air' ? airplanesList : groundVehiclesList;

        if (val === '*') {
            for (var i = 0; i < list.children.length; i++) {
                list.children[i].style.display = null;
            }
        } else {
            for (var i = 0; i < list.children.length; i++) {
                list.children[i].style.display = list.children[i]._type === val
                    ? null
                    : 'none';
            }
        }
        vehicleName.value = '';
    });

    var vehicleNameInputHandlerDebounced = debounce(function (e) {
        var val = vehicleName.value.toLowerCase();
        var list = t === 'air' ? airplanesList : groundVehiclesList;
        vehicleName.classList.remove('waiting');
        vehicleClass.selectedIndex = 0;

        if (val === '') {
            for (var i = 0; i < list.children.length; i++) {
                list.children[i].style.display = null;
            }
        } else {
            for (var i = 0; i < list.children.length; i++) {
                list.children[i].style.display = list.children[i]._title.indexOf(val) !== -1
                    ? null
                    : 'none';
            }
        }
    }, 500);

    vehicleName.addEventListener('input', function (e) {
        vehicleClass.selectedIndex = 0;
        vehicleName.classList.add('waiting');
        vehicleNameInputHandlerDebounced(e);
    });
}

function setVehicleType(t) {
    var toRemove = t === 'ground' ? airplanesList : groundVehiclesList;
    var toShow = t === 'air' ? airplanesList : groundVehiclesList;
    vehicleType.querySelectorAll('a').forEach(function (x) { x.classList.remove('active'); });
    vehicleType.querySelector('[data-vehicle-type=' + t + ']').classList.add('active');
    toRemove.style.display = 'none';
    toShow.style.display = 'block';

    setOptions(vehicleClass, t === 'air' ? [
        { name: 'Fighter', value: 'fighter' },
        { name: 'Assault', value: 'assault' },
        { name: 'Bomber', value: 'bomber' }
    ] : [
        { name: 'Tank', value: 'tank' },
        { name: 'Heavy tank', value: 'heavy_tank' },
        { name: 'Tank destroyer', value: 'tank_destroyer' },
        { name: 'SPAA', value: 'spaa' }
    ]);
}

function setOptions(select, values) {
    while (select.firstChild) select.removeChild(select.firstChild);
    var option = select.appendChild(document.createElement('option'));
    option.setAttribute('value', '*');
    option.setAttribute('selected', '');
    option.innerText = 'Any';
    for (var i = 0; i < values.length; i++) {
        option = select.appendChild(document.createElement('option'));
        option.setAttribute('value', values[i].value);
        option.innerText = values[i].name;
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};