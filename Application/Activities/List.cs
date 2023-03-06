using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence; 

//返回所有Activities清單內容
namespace Application.Activities
{
    public class List 
    {
        public class Query : IRequest<List<Activity>> {}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            //依賴注入資料庫上下文
            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}