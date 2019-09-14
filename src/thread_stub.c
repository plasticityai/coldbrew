#include <signal.h>
#include <semaphore.h>

int pthread_kill(pthread_t thread, int sig) {
  return 1;
}

int sched_get_priority_max(int policy) {
  return -1;
}

int sched_get_priority_min(int policy) {
  return -1;
}

int sem_timedwait(sem_t *sem, const struct timespec *abs_timeout) {
  return -1;
}