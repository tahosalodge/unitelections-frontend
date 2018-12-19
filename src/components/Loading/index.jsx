import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ loading, children }) =>
  loading ? CircularProgress : children;

export default Loading;
