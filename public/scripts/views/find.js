var FindPage = React.createClass(
  {
    displayName: 'FindPage',
    render: function () {
      return (
        React.createElement('div', {
          className: 'find'
        },
          React.createElement(TopBar, null),
          React.createElement(FindForm, null)
        )
      )
    }
  }
);

var Forms = React.createClass(
  {
    displayName: 'Forms',
    getInitialState: function () {
      return {value: ""}
    },
    handleChange: function (event) {
      this.setState({value: event.target.value})
    },
    render: function () {
      return (
        React.createElement('p', null,
          React.createElement('label', {className: 'inputs-labels'}, this.props.descript),
          React.createElement('input', {
            className: this.props.className,
            type: this.props.type,
            onChange: this.handleChange,
            value: this.state.value,
            placeholder: this.props.placeholder,
            about: this.props.about
          })
        )
      )
    }
  }
)

var SelectOpt = React.createClass(
  {
    displayName: 'Select',
    render: function () {
      return (
        React.createElement('select', {
            className: 'selectBox',
            defaultValue:""
          },
            React.createElement('option', {
              value: this.props.selectBoxes
            }, this.props.selectBoxes)
        )
      )
    }
  }
)


var FindForm = React.createClass(
  {
    displayName: 'FindForm',
    render: function () {
      return (
        React.createElement('div', {
            className: 'findPageView'
          },
          React.createElement('div', {
            className: 'find-header'
          }, React.createElement('p', null, 'I lost...')
        ),
          React.createElement(Forms, {
            descript: 'Your name',
            className: 'inputs',
            about: 'passportFirst',
            type: 'text',
            placeholder: 'Arthur'
          }),
          React.createElement(Forms, {
            descript: 'Your lastname',
            className: 'inputs',
            type: 'text',
            about: 'passportLast',
            placeholder: 'Kuznecov'
          }),
          React.createElement(Forms, {
            descript: 'Please enter place where you lost your thing',
            className: 'inputs',
            type: 'text',
            about: 'place',
            placeholder: 'Chuy/Sovetskaya st. 141'
          }),
          React.createElement(Forms, {
            descript: 'ID of passport(if you know)',
            className: 'inputs',
            type: 'text',
            about: 'passportID',
            placeholder: 'AN323451'
          }),
          React.createElement(Forms, {
            descript: 'Your email',
            className: 'inputs',
            type: 'text',
            about: 'email',
            placeholder: 'vampcore1@gmail.com'
          }),
          React.createElement(Forms, {
            descript: 'Your phone',
            className: 'inputs',
            type: 'text',
            about: 'phone',
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
                url: 'http://localhost:3000/find/',
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

var SuccessTooltip = React.createClass({
  displayName: 'SuccessTooltip',
  render: function() {
    if (this.props.found) {
      var temp = [];
      for (var i = 0; i < this.props.found[0].length; i++) {
        temp.push(this.props.found[0][i]);
      }
      return (
        React.createElement('div', {
          className: 'successTool'
        },
          temp.forEach(function(each){
            React.createElement('p', null, each);
          }),
          React.createElement('p', null, temp)
      )
      )
    } else {
      return (
          React.createElement('div', {
            className: 'successTool'
          },
            React.createElement('p', null, 'You are succefully registered item. Wait until it will be found')
          )
      )
  }

  }
})
