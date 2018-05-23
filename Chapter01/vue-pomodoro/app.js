const POMODORO_STATES = {
  WORK: 'work',
  REST: 'rest'
}

const STATES = {
  STARTED: 'started',
  STOPPED: 'stopped',
  PAUSED: 'paused'
}

const WORKING_TIME_LENGTH_IN_MINUTES = 10
const RESTING_TIME_LENGTH_IN_MINUTES = 5

new Vue({
  el: '#app',
  
  data: {
    state: STATES.STOPPED,
    minute: WORKING_TIME_LENGTH_IN_MINUTES,
    second: 0,
    pomodoroState: POMODORO_STATES.WORK,
    timestamp: 0
  },

  computed: {
    title: function() {
      return this.pomodoroState === POMODORO_STATES.WORK ? 'Work': 'Rest!'
    },

    min: function() {
      if(this.minute < 10) {
        return '0' + this.minute
      }

      return this.minute
    },

    sec: function() {
      if(this.second < 10) {
        return '0' + this.second
      }

      return this.second
    },

    catImg: function() {
      return 'http://thecatapi.com/api/images/get?type=gif&size=med'
    }
  },

  methods: {
    start: function() {
      this.state = STATES.STARTED
      this.__tick()
      this.interval = setInterval(this.__tick, 100)
    },

    pause: function() {
      this.state = STATES.PAUSED
      clearInterval(this.interval)
    },

    stop: function() {
      this.state = STATES.STOPPED
      clearInterval(this.interval)
      this.pomodoroState = POMODORO_STATES.WORK
      this.minute = WORKING_TIME_LENGTH_IN_MINUTES
      this.second = 0
    },

    __tick: function() {
      
      // decrease second when it's not 0
      if(this.second != 0) {
        this.second--
        return
      }

      // set second to 59 when minute is not 0 and second is 0
      if(this.minute != 0) {
        this.minute--
        this.second = 59
        return
      }

      // toggle working/resting when minute and second are 0
      this.pomodoroState = this.pomodoroState === POMODORO_STATES.WORK ? POMODORO_STATES.REST : POMODORO_STATES.WORK

      if(this.pomodoroState === POMODORO_STATES.WORK) {
        this.minute = WORKING_TIME_LENGTH_IN_MINUTES
      } else {
        this.minute = RESTING_TIME_LENGTH_IN_MINUTES
      }
    }
  }
})