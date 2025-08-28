# Mini Clinical Trial Dashboard

  
By Nicholas Cho

A mini clinical trial dashboard for the Miracle Take-home Assignment

Stack: Next.js, Material UI, Tailwind CSS, dnd-kit, Recharts


I chose to use Next.js for this project for its built-in support for routing and API handling, which was especially useful in a context where I didn’t need to build a dedicated backend. The framework allowed for quick development and seamless integration of server-side functionality through API routes.

For the UI, I utilized Material UI because its ready-made components provided a fast and efficient way to build a clean and functional dashboard interface. For styling non-MUI elements, I used Tailwind CSS, which helped keep my codebase lightweight instead of writing out separate CSS files.

Given the scope of this project, these libraries helped reduce the overhead of low-level implementation details and allowed me to focus on functionality and layout.

To support specific UI features:

-   I used Recharts for data visualization
    
-   I used dnd-kit for implementing drag-and-drop functionality within the dashboard
    

Rather than building out a full backend, I opted to just use Next API routes to handle data fetching and aggregation. As a result, I’m not persisting any data to a database. Instead, I chose to store information like dashboard state in local storage to maintain state between page refreshes. This approach felt appropriate for the project’s scope as opposed to setting up database infrastructure. 

I also cache the US clinical trial data in-memory after the initial fetch, so that any subsequent aggregations needed when generating the charts can be done on the cached data. This cached data lives for 10 minutes, after which any following API call would re-query the external US API.

### Other Tools & Resources

Since this was my first time working with libraries like Recharts and dnd-kit, I used ChatGPT as a supplementary resource to help visualize simple use cases. It was particularly helpful in understanding how to apply these tools to my use case, alongside reading official documentation in order to get a deeper understanding of both syntax and function.

I also included a file txt-parser.py in my repository. This is a Python script that I used to parse the raw EU text files into a structured JSON format.
    
    

### Incomplete Feature

While I completed most parts of the assignment, I did not get to implementing Part 5. With more time, I would have reconsidered how to approach filtering. I think the challenge was the fact that my charts were already built around pre-filtered and aggregated data types, so adding another layer of filtering felt redundant within the current setup.

That said, I'm happy to further discuss my thought process, as well as any feedback or suggestions you may have. Thank you for your time!

## How to run

 - Clone the repository
 - `npm install` to install dependencies (may need run with `--legacy-peer-deps` as I did previously download a deprecated drag-n-drop library, but I believe I should have removed it from the dependencies).
 - `npm run dev`
 - Go to http://localhost:3000 to view the project