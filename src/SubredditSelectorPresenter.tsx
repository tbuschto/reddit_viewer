import { Composite, NavigationView } from 'tabris';
import { ChangeListeners, inject, Listeners, shared } from 'tabris-decorators';
import { AUTO_FETCH_COUNT, DEFAULT_REDDITS, RedditPost, ViewMode } from './common';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './SubredditPresenter';

export abstract class SubredditSelectorView {
  public abstract items: string[];
  public abstract selectionIndex: number;
  public abstract onSelectionIndexChanged: ChangeListeners<number>;
}

@shared export default class SubredditSelectorPresenter {

  constructor(
    @inject private readonly view: SubredditSelectorView,
    @inject private readonly subredditPresenter: SubredditPresenter
  ) {
    view.onSelectionIndexChanged(() => this.updateSubreddit());
  }

  public set subreddits(subreddits: string[]) {
    this.view.items = subreddits;
    this.updateSubreddit();
  }

  public get subreddits() {
    return this.view.items;
  }

  private updateSubreddit() {
    this.subredditPresenter.subreddit = this.view.items[this.view.selectionIndex];
  }

}
