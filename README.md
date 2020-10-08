# [arnaudvalensi.github.io](https://arnaudvalensi.github.io/)

My personal blog. Powered by [GatsbyJS](https://www.gatsbyjs.com/) and [Notion](https://www.notion.so/)

This blog uses content from notes made in [notion.so](https://www.notion.so/) and automatically deploys on github pages.

You can read my blog post about this, [here](https://arnaudvalensi.github.io/blog/making-a-blog-using-notion-gatsby-and-github-pages/)

## To run locally

Copy the file `.env.example` to `.env` and fill the `NOTION_TOKEN` and `NOTION_ROOT_PAGE_ID` variable.

Follow [this](https://www.redgregory.com/notion/2020/6/15/9zuzav95gwzwewdu1dspweqbv481s5) to see how to get your notion token.

The `NOTION_ROOT_PAGE_ID` is the ID of the root note of your blog. The root note is a regular notion note which indexes all the posts you want to import in the blog, therefore, it should only list links to other notes.

If the link of your root note is this `https://www.notion.so/Blog-83f4047341534d6bb846b1f561a13173`, the id is this: `83f4047341534d6bb846b1f561a13173`

Then you can do `yarn import-notion-posts` to import post from notion to `./content/blog`.

Finally, you can do `yarn develop` to run the blog locally.

## To manually deploy to github pages

`yarn import-notion-posts` to import the posts from notion.

`yarn deploy` to build and publish the `public` directory to github page.

To deploy on github pages, you have to use your username as repository name. See [here](https://pages.github.com/) for more information.

If you don't want to deploy to github pages, you can host the content of the `public` directory anywhere you want.

## Automatically deploy to github pages

If you push this repository to github, it will use the [github action](https://github.com/features/actions) stored in `.github/workflows/deploy.yml` and automatically import your post from notion and build the blog.

You have to let github know your `NOTION_TOKEN` and `NOTION_ROOT_PAGE_ID`. To do so, fill the info as [github secret](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).

The github action is configured to import the blog posts and rebuild the blog either:

- every day at midnight UTC
- each time you push on master
- if you manually trigger the action on github

## Posts

To make the system work, you have to fill the following elements on your blog posts:
![exampel](https://user-images.githubusercontent.com/604486/95316471-24c4ee80-0894-11eb-8399-f99701b801da.png)

