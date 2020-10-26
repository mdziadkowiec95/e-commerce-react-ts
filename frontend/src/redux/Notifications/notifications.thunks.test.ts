import { validate as uuidValidate } from 'uuid';
import { Notification, NotificationType } from '../../components/NotificationBar/NotificationBar';
import * as NotificationsThunks from './notifications.thunks';
import { AppMockStore, generateMockStore } from '../../../tests/helpers/mockStore';
import { NotificationsActions } from "./notifications.reducer";

const initialState: Notification[] = [];

// Based on the article -> https://medium.com/@mistryakshar54/testing-redux-thunk-actions-using-jest-da17c97824bb
describe('Notifications thunks', () => {
  let store: AppMockStore;

  beforeEach(() => {
    store = generateMockStore(initialState);
  });

  test('should generate valid UUID for new notification', () => {
    store.dispatch(NotificationsThunks.addNotification({
      type: NotificationType.Info,
      message: 'Get a discount only today!'
    }));

    expect(uuidValidate(store.getActions()[0].payload.id)).toBe(true);
  });

  test('should return notification action when notification is added', () => {
    store.dispatch(NotificationsThunks.addNotification({
      type: NotificationType.Info,
      message: 'Get a discount only today!'
    }));

    expect(store.getActions()).toEqual([
      {
        type: NotificationsActions.addNotification.type,
        payload: {
          id: expect.any(String),
          type: NotificationType.Info,
          message: 'Get a discount only today!'
        }
      }
    ]);
  });
  test('should remove notification after timeout', () => {
    jest.useFakeTimers();
    store.dispatch(NotificationsThunks.addNotification({
      type: NotificationType.Info,
      message: 'Get a discount only today!'
    }));

    jest.runAllTimers();

    expect(store.getActions()).toEqual([
      {
        type: NotificationsActions.addNotification.type,
        payload: {
          id: expect.any(String),
          type: NotificationType.Info,
          message: 'Get a discount only today!'
        }
      },
      {
        type: NotificationsActions.removeNotification.type,
        payload: {
          id: expect.any(String),
        }
      }
    ]);

    expect(store.getActions()[0].payload.id).toEqual(store.getActions()[1].payload.id);
  });

  test('should remove notification after 15 seconds by default', () => {
    jest.useFakeTimers();
    store.dispatch(NotificationsThunks.addNotification({
      type: NotificationType.Info,
      message: 'Get a discount only today!'
    }));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 15000);
  });

  test('should remove notification after defined timeout properly', () => {
    jest.useFakeTimers();
    store.dispatch(NotificationsThunks.addNotification({
      type: NotificationType.Info,
      message: 'Get a discount only today!'
    }, 45));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 45000);
  });
});