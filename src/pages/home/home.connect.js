import { connect } from 'react-redux';

const mapStatetoProps = (state) => ({
  // Map relevant state slices to props
  data: state.yourSliceName.employees,
  loading: state.yourSliceName.loading,
  error: state.yourSliceName.error,
});

const mapDispatchToProps = {
  // Map actions to component props
  fetchData,
};

export default connect(mapStatetoProps, mapDispatchToProps);
