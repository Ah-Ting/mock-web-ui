$(document).ready(function () {
    const userData = [
        {
            name: "Lebron James",
            address: "123 Jalan SS2",
            city: "Petaling Jaya",
            postcode: "47300",
            state: "Selangor",
            country: "Malaysia"
        },
        {
            name: "Lionel Messi",
            address: "10 Jalan 14/10",
            city: "Petaling Jaya",
            postcode: "47400",
            state: "Selangor",
            country: "Malaysia"
        },
        {
            name: "Super Ting",
            address: "9 Jalan Anggerik Vanilla",
            city: "Shah Alam",
            postcode: "40460",
            state: "Selangor",
            country: "Malaysia"
        },
        {
            name: "Max Verstappen",
            address: "12 Jalan Alor",
            city: "Johor Bahru",
            postcode: "50200",
            state: "Johor",
            country: "Malaysia"
        }
    ];

    // Group userData by country → state → city
    const treeStructure = {};

    userData.forEach(user => {
        const { country, state, city } = user;
        if (!treeStructure[country]) treeStructure[country] = {};
        if (!treeStructure[country][state]) treeStructure[country][state] = new Set();
        treeStructure[country][state].add(city);
    });

    // Tree menu
    const $tree = $('.tree');
    $tree.empty();

    for (const country in treeStructure) {
        const $countryLi = $(`<li><span class="toggle-icon"></span><span class="node country-node">${country}</span><ul></ul></li>`);
        const $stateUl = $countryLi.find('ul');

        for (const state in treeStructure[country]) {
            const $stateLi = $(`<li><span class="toggle-icon"></span><span class="node state-node">${state}</span><ul></ul></li>`);
            const $cityUl = $stateLi.find('ul');

            treeStructure[country][state].forEach(city => {
                const $cityLi = $(`<li><span class="node city-node">${city}</span></li>`);
                $cityUl.append($cityLi);
            });

            $stateUl.append($stateLi);
        }

        $tree.append($countryLi);
    }

    $tree.on('click', '.node', function (e) {
        e.stopPropagation();
        const $this = $(this);
        const $li = $this.parent();
        $li.toggleClass('open');

        if ($this.hasClass('city-node')) {
            const city = $this.text().trim();
            const filtered = userData.filter(u => u.city === city);

            const tbody = $('#data-table tbody');
            tbody.empty();

            filtered.forEach((user, index) => {
                tbody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.address}</td>
                    <td>${user.city}</td>
                    <td>${user.postcode}</td>
                    <td>${user.country}</td>
                    <td><button class="view-btn">View</button></td>
                </tr>
            `);
            });

            $('#data-table-container').show();
        }
    });

    // Handle view button
    $('#data-table').on('click', '.view-btn', function () {
        const row = $(this).closest('tr');
        const rowData = row.find('td').map(function () {
            return $(this).text();
        }).get();

        alert(`User Info:\n#${rowData[0]}\nName: ${rowData[1]}\nAddress: ${rowData[2]}\nCity: ${rowData[3]}\nPostcode: ${rowData[4]}\nCountry: ${rowData[5]}`);
    });

    // Tab switching
    $('.tab-button').on('click', function () {
        const tab = $(this).data('tab');

        $('.tab-button').removeClass('active');
        $(this).addClass('active');

        $('.tab-content').removeClass('active');
        $('#' + tab).addClass('active');

        if (tab === 'home') {
            $('#sidebar').show();
            $('#data-table-container').show();
        } else {
            $('#data-table-container').hide();
        }
    });

    // Login form
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const userId = $('#userid').val();
        const password = $('#password').val();
        alert(`Login Form Submitted:\nUserID: ${userId}\nPassword: ${password}`);
    });

    // Init
    $('#home').addClass('active');
});
