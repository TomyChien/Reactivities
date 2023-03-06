using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        

        //取消此類中注入數據的上下文用 IMedia 取代
        // private readonly DataContext _context;

        // public ActivitiesController(DataContext context)  //建立一個新實例在內部使用
        // {
        //     _context = context;
        // }
        
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // return await _context.Activities.ToListAsync();
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/activities/id..number
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            return await _mediator.Send(new Detail.Query{Id = id});
        }

        [HttpPost]
        //因為不需要返回Activity物件所以這種情況下可以使用不同類型的內容,IActionRequest可以能夠訪問回應OK/ERROR/Null
        public async Task<IActionResult> CreateActivity(Activity activity)
                                                        //[FromBody]
        {
            return Ok(await _mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await _mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await _mediator.Send(new Delete.Command{Id = id}));
        }
    }
}