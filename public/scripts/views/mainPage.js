var MainPage = React.createClass({displayName: 'mainPage',
  render: function() {
    return (

      React.createElement('div', {className: "mainPage"},
          React.createElement(TopBar, null),
          React.createElement('p', {className: 'slogan'}, 'Let people find your thing or return back something to its owner'),
          React.createElement(CusButton, {
            name: 'I found!',
            className: 'mainButtons',
            onClick: function () {
              var component = React.createElement(FoundPage),
                  container = document.getElementById('content');

              ReactDOM.render(component, container);
            }
          }),

          React.createElement(CusButton, {
            name: 'I lost!',
            className: 'mainButtons',
            onClick: function () {
              var component = React.createElement(FindPage),
                  container = document.getElementById('content');

              ReactDOM.render(component, container);
            }
          })
        )
    );
  }
});

var CusButton = React.createClass({
  displayName: 'buttons',
  getInitialState: function () {
    return {
      onCLick: this.props.onClick
    }
  },
  render: function() {
    return (
      React.createElement('button', {
        className: this.props.className,
        onClick: this.state.onCLick
      },
        this.props.name
      )
    )
  }
})

var TopBar = React.createClass({
  displayName: 'topBar',
  render: function () {
    return (
      React.createElement('div',
        {
          className: 'topBar'
        },
          React.createElement(CusButton, {
            name: 'Home',
            className: 'headerBtns',
            onClick: function () {
              var component = React.createElement(MainPage),
                  container = document.getElementById('content');

              ReactDOM.render(component, container);
            }
          }),
          React.createElement(CusButton, {
            name: 'About us',
            className: 'headerBtns'
          }),
          React.createElement(CusButton, {
            name: 'Instructions',
            className: 'headerBtns'
          }),
          React.createElement(CusButton, {
            name: 'Contacts',
            className: 'headerBtns'
          })
      )
    )
  }
})
