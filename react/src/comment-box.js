var data = [
  {author: "Pete Huntz", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});
React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);


//UP TO : 'Fetching from the server'
//https://facebook.github.io/react/docs/tutorial.html#fetching-from-the-server