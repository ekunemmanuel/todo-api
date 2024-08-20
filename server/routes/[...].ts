export default defineEventHandler((event) => {
  // Catch all route then redirect to the api link
  const url = getRequestURL(event);
  return sendRedirect(event, `${url.origin}/api`, 301); 
});
