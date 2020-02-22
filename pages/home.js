export const homePage = `
<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text {
        align-self: center;
    }

    @media (min-width: 766px) {
        flex-direction: row;
    }
</style>

<h1>Welcome to codepleb's</h1>

<div class="content">
    <cp-image src="/assets/codepleb.png"></cp-image>
    <div class="text">
        <p>Great minds discuss ideas, average minds discuss events, small minds discuss people.</p>

        <p>This is just a webpage. Several things I tried and tested just randomly appear here.</p>
        <p>No frameworks and libraries are being used, everything you see here are core web technologies.</p>
    </div>
</div>
`;
