var FoundPage = React.createClass(
  {
    displayName: 'FindPage',
    render: function () {
      return (
        React.createElement('div', {
          className: 'find'
        },
          React.createElement(TopBar, null),
          React.createElement(FoundForm, null)
        )
      )
    }
  }
);

var FoundForm = React.createClass(
  {
    displayName: 'FindForm',
    render: function () {
      return (
        React.createElement('div', {
            className: 'findPageView'
          },
          React.createElement('div', {
            className: 'find-header'
          }, React.createElement('p', null, 'I\'ve found!')
        ),
          React.createElement(Forms, {
            descript: 'Your name',
            className: 'inputs',
            about: 'personFirst',
            type: 'text',
            placeholder: 'Arthur'
          }),
          React.createElement(Forms, {
            descript: 'Your lastname',
            className: 'inputs',
            about: 'personLast',
            type: 'text',
            placeholder: 'Kuznecov'
          }),
          React.createElement(Forms, {
            descript: 'Please enter place where you find your thing',
            className: 'inputs',
            about: 'place',
            type: 'text',
            placeholder: 'Chuy/Sovetskaya st. 141'
          }),
          React.createElement(Forms, {
            descript: 'Passport firstname',
            className: 'inputs',
            about: 'passportFirst',
            type: 'text',
            placeholder: 'Abai'
          }),
          React.createElement(Forms, {
            descript: 'Passport lastname',
            className: 'inputs',
            about: 'passportLast',
            type: 'text',
            placeholder: 'Abakirov'
          }),
          React.createElement(Forms, {
            descript: 'ID of passport',
            className: 'inputs',
            about: 'passportID',
            type: 'text',
            placeholder: 'AN323451'
          }),
          React.createElement(Forms, {
            descript: 'Your email',
            className: 'inputs',
            about: 'email',
            type: 'text',
            placeholder: 'vampcore1@gmail.com'
          }),
          React.createElement(Forms, {
            descript: 'Your phone',
            className: 'inputs',
            about: 'phone',
            type: 'text',
            placeholder: '+996-709-29-31-61'
          }),
          React.createElement(CusButton, {
            name: 'Submit',
            className: 'submitButton mainButtons',
            onClick: function () {
              var inputs = $('.inputs'),
                  data = {};
              for(var i = 0; i < inputs.length; i++) {
                console.log($(inputs[i]).attr('about'))
                data[$(inputs[i]).attr('about')] = $(inputs[i]).val();
              }

              $.ajax({
                method: "POST",
                type: 'json',
                url: 'http://localhost:3000/found/',
                data: data
              }).done(function(msg){
                var component = React.createElement(SuccessTooltip, {found: msg}),
                    container = document.querySelector('.findPageView');

                ReactDOM.render(component, container)
              })
            }
          })
        )
      )
    }
  }
)
