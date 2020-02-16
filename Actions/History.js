/* (C) 2019 Stephen Matheis */

export default function History(args) {
    if (!history.state || history.state.url !== args.url) {
        history.pushState({
            url: args.url,
            title: args.title
        }, args.title, args.url);
    }

    document.title = args.title;
}
