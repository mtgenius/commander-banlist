export default process.env.NODE_ENV === 'development'
  ? require('./use-commander-banlist.dev').default
  : require('./use-commander-banlist.prod').default;
