using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Detail
    {
        public class Query : IRequest<Activity>  //返回Activity類型
        {
            public Guid Id {get;set;}
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            //依賴注入資料庫上下文
            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}